using System.Security.Claims;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using API.RequestParams;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

public class BookingService : IBookingService
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;
    private readonly IWorkingTimeService _workingTimeService;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public BookingService(DataContext context, IMapper mapper, IHttpContextAccessor httpContextAccessor, IWorkingTimeService workingTimeService)
    {
        _mapper = mapper;
        _context = context;
        _workingTimeService = workingTimeService;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task<PagedList<BookingDto>> GetAllBookingsAsync([FromQuery] BookingParams bookingParams)
    {
        var query = _context.Bookings
            .Include(x => x.CreatedBy)
            .Include(x => x.UpdatedBy)
            .Include(x => x.Service)
            .AsNoTracking()
            .AsQueryable();

        if (!string.IsNullOrEmpty(bookingParams.BookingStatus))
        {
            query = query.Where(x => x.BookingStatus.Equals(bookingParams.BookingStatus));
        }

        if (bookingParams.From.HasValue)
        {
            query = query.Where(x => x.BookingDate.HasValue && x.BookingDate.Value.Date >= bookingParams.From.Value.ToDateTime(TimeOnly.MinValue).Date);
        }

        if (bookingParams.To.HasValue)
        {
            var toDate = bookingParams.To.Value.AddDays(1);
            query = query.Where(x => x.BookingDate.HasValue && x.BookingDate.Value.Date <= toDate.ToDateTime(TimeOnly.MinValue).Date);
        }

        if (bookingParams.ServiceId != null && bookingParams.ServiceId != Guid.Empty)
        {
            query = query.Where(x => x.ServiceId.Equals(bookingParams.ServiceId));
        }

        return await PagedList<BookingDto>.CreateAsync(
            query.ProjectTo<BookingDto>(_mapper.ConfigurationProvider),
            bookingParams.PageNumber,
            bookingParams.PageSize);
    }

    public async Task<BookingDto> GetBookingByIdAsync(Guid id)
    {
        var booking = await _context.Bookings
            .Include(x => x.Service)
            .FirstOrDefaultAsync(x => x.Id == id);

        if (booking == null)
        {
            throw new KeyNotFoundException($"Booking with id {id} not found.");
        }
        return _mapper.Map<BookingDto>(booking);
    }

    public async Task<List<string>> GetAvailableSlotsAsync(DateOnly date)
    {
        if (date < DateOnly.FromDateTime(TimeHelper.GetCurrentTimeInAbuDhabi()))
        {
            throw new Exception("Booking date must be in the future.");
        }

        var currentTimeOnly = TimeOnly.FromDateTime(TimeHelper.GetCurrentTimeInAbuDhabi());
        var availableSlots = new List<TimeOnly>();

        var workingTimeAvailable = await _workingTimeService
            .GetAvailableWorkingTimes(date.DayOfWeek);

        var workingFrom = date > DateOnly.FromDateTime(TimeHelper.GetCurrentTimeInAbuDhabi())
            ? workingTimeAvailable.FromTime
            : workingTimeAvailable.FromTime > currentTimeOnly
                ? workingTimeAvailable.FromTime
                : currentTimeOnly.AddMinutes(30);

        var workingTo = workingTimeAvailable.ToTime > workingTimeAvailable.FromTime
            ? workingTimeAvailable.ToTime
            : throw new Exception("Correct booking dates.");

        int totalCars = await _context.Cars.Where(x => !x.IsDeleted).CountAsync();

        var bookings = await _context.Bookings
            .Where(b => b.BookingDate.HasValue &&
                        b.BookingDate.Value.Date == date.ToDateTime(TimeOnly.MinValue).Date &&
                        (b.BookingStatus == BookingStatus.InProcess ||
                         b.BookingStatus == BookingStatus.Finished))
            .ToListAsync();

        var currentStartTime = workingFrom;

        while (currentStartTime.AddHours(2) <= workingTo)
        {
            if (currentStartTime >= workingTo.AddHours(-1))
            {
                break;
            }

            var endTime = currentStartTime.AddHours(2);

            int carsInUse = bookings.Count(b =>
               b.BookingDate.HasValue && b.EndBookingDate.HasValue &&
               b.BookingDate.Value.TimeOfDay < endTime.ToTimeSpan() &&
               b.EndBookingDate.Value.TimeOfDay > currentStartTime.ToTimeSpan());

            if (carsInUse < totalCars)
            {
                availableSlots.Add(currentStartTime);
            }
            else
            {
                var overlappingBooking = bookings
                    .Where(b =>
                        b.BookingDate.HasValue && b.EndBookingDate.HasValue &&
                        b.BookingDate.Value.TimeOfDay < endTime.ToTimeSpan() &&
                        b.EndBookingDate.Value.TimeOfDay > currentStartTime.ToTimeSpan())
                    .OrderBy(b => b.EndBookingDate!.Value)
                    .FirstOrDefault();

                if (overlappingBooking != null && overlappingBooking.BookingStatus == BookingStatus.Finished)
                {
                    currentStartTime = TimeOnly.FromTimeSpan(overlappingBooking.EndBookingDate!.Value.TimeOfDay);
                    continue;
                }
            }

            currentStartTime = currentStartTime.AddHours(2);
        }

        return availableSlots.Select(slot => slot.ToString("hh:mm tt")).ToList();
    }

    public async Task<BookingDto> AddBookingAsync(BookingSaveDto model)
    {
        var service = await _context.Services.FirstOrDefaultAsync(x => x.Id == model.ServiceId);
        if (service == null)
        {
            throw new KeyNotFoundException($"Service with id {model.ServiceId} not found.");
        }
        var booking = _mapper.Map<Booking>(model);

        var availableCar = await _context.Cars
            .Where(c => !c.IsDeleted &&
                !_context.Bookings.Any(b =>
                    b.CarId == c.Id &&
                    b.BookingDate < booking.EndBookingDate &&
                    b.EndBookingDate > booking.BookingDate))
            .FirstOrDefaultAsync();

        if (availableCar == null) throw new Exception("No available cars for the selected time slot.");

        booking.CarId = availableCar.Id;
        ValidateBookingConditionsAsync(booking);
        booking.CreateDate = TimeHelper.GetCurrentTimeInAbuDhabi();
        booking.CreatedById = GetCurrentUserId();
        booking.BookingStatus = BookingStatus.Pending;

        // var serviceOptions = model?.serviceOptionIds != null && model.serviceOptionIds.Any()
        //     ? await _context.ServiceOptions
        //         .Where(x => model.serviceOptionIds.Contains(x.Id.ToString()))
        //         .ToListAsync()
        //     : new List<ServiceOption>();

        // booking.ServiceOptions = serviceOptions;

        _context.Bookings.Add(booking);
        await _context.SaveChangesAsync();

        return _mapper.Map<BookingDto>(booking);
    }

    public async Task DeleteBookingAsync(Guid id)
    {
        var booking = await _context.Bookings.FindAsync(id);
        if (booking == null) throw new KeyNotFoundException($"Booking with id {id} not found.");

        _context.Bookings.Remove(booking);

        var result = await _context.SaveChangesAsync() > 0;
        if (!result) throw new Exception("Failed to delete the Booking.");
    }

    public async Task SetBookingStateRejected(Guid id)
    {
        var booking = await _context.Bookings.FindAsync(id);
        if (booking == null) throw new KeyNotFoundException($"Booking with id {id} not found.");

        booking.BookingStatus = BookingStatus.Rejected;
        booking.UpdatedById = GetCurrentUserId();
        booking.UpdateDate = TimeHelper.GetCurrentTimeInAbuDhabi();

        var result = await _context.SaveChangesAsync() > 0;
        if (!result) throw new Exception("Failed to change booking status to 'Rejected'.");
    }

    public async Task SetBookingStateFinished(Guid id)
    {
        var booking = await _context.Bookings.FindAsync(id);
        if (booking == null) throw new KeyNotFoundException($"Booking with id {id} not found.");

        booking.BookingStatus = BookingStatus.Finished;
        booking.EndBookingDate = TimeHelper.GetCurrentTimeInAbuDhabi();
        booking.UpdatedById = GetCurrentUserId();
        booking.UpdateDate = TimeHelper.GetCurrentTimeInAbuDhabi();

        ValidateBookingConditionsAsync(booking);

        var result = await _context.SaveChangesAsync() > 0;
        if (!result) throw new Exception("Failed to change booking status to 'Finished'.");
    }

    private string GetCurrentUserId()
    {
        return _httpContextAccessor
            .HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value
                ?? null!;
    }

    private void ValidateBookingConditionsAsync(Booking booking)
    {
        if (booking.ServiceId == null || booking.ServiceId == Guid.Empty)
            throw new InvalidOperationException("Service ID is required.");

        if (booking.BookingDate.HasValue && booking.BookingDate.Value < TimeHelper.GetCurrentTimeInAbuDhabi())
            throw new InvalidOperationException("Booking date must be in the future.");

        if (booking.EndBookingDate.HasValue && booking.BookingDate.HasValue &&
            booking.EndBookingDate.Value <= booking.BookingDate.Value.AddMinutes(30))
        {
            throw new InvalidOperationException("EndBookingDate must be at least 30 minutes after BookingDate.");
        }
    }
}