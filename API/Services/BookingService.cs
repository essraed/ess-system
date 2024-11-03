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

    public async Task<List<TimeOnly>> GetAvailableSlotsAsync(DateOnly date)
    {
        if (date < DateOnly.FromDateTime(DateTime.Now))
        {
            throw new Exception("Booking date must be in the future.");
        }

        var currentTimeOnly = TimeOnly.FromDateTime(DateTime.Now);
        var availableSlots = new List<TimeOnly>();

        // Get available working hours for the given day of the week
        var workingTimeAvailable = await _workingTimeService
            .GetAvailableWorkingTimes(date.DayOfWeek);

        var workingFrom = date > DateOnly.FromDateTime(DateTime.Now)
            ? workingTimeAvailable.FromTime
            : workingTimeAvailable.FromTime > currentTimeOnly
                ? workingTimeAvailable.FromTime
                : currentTimeOnly.AddMinutes(30);

        var workingTo = workingTimeAvailable.ToTime > workingTimeAvailable.FromTime
            ? workingTimeAvailable.ToTime
            : throw new Exception("Correct booking dates.");

        // Count the total number of cars available
        int totalCars = await _context.Cars.Where(x => !x.IsDeleted).CountAsync();

        // Fetch all bookings for the specified date
        var bookings = await _context.Bookings
            .Where(b => b.BookingDate.HasValue &&
                        b.BookingDate.Value.Date == date.ToDateTime(TimeOnly.MinValue).Date &&
                        (b.BookingStatus == BookingStatus.New ||
                         b.BookingStatus == BookingStatus.InProcess ||
                         b.BookingStatus == BookingStatus.Finished))
            .ToListAsync();

        var currentStartTime = workingFrom;

        // Iterate through time slots in 2-hour increments
        while (currentStartTime.AddHours(2) <= workingTo)
        {
            // Break if the current start time exceeds working hours
            if (currentStartTime >= workingTo.AddHours(-1))
            {
                break;
            }

            var endTime = currentStartTime.AddHours(2);

            // Count how many cars are in use during the current time slot
            int carsInUse = bookings.Count(b =>
               b.BookingDate.HasValue && b.EndBookingDate.HasValue &&
               b.BookingDate.Value.TimeOfDay < endTime.ToTimeSpan() &&
               b.EndBookingDate.Value.TimeOfDay > currentStartTime.ToTimeSpan());

            // Check if there are available cars for the current time slot
            if (carsInUse < totalCars)
            {
                availableSlots.Add(currentStartTime);
            }
            else
            {
                // Find the closest overlapping booking
                var overlappingBooking = bookings
                    .Where(b =>
                        b.BookingDate.HasValue && b.EndBookingDate.HasValue &&
                        b.BookingDate.Value.TimeOfDay < endTime.ToTimeSpan() &&
                        b.EndBookingDate.Value.TimeOfDay > currentStartTime.ToTimeSpan())
                    .OrderBy(b => b.EndBookingDate!.Value) // Order by EndBookingDate
                    .FirstOrDefault(); // Get the first overlapping booking

                // If there is an overlapping booking, move the current start time to the end of that booking
                if (overlappingBooking != null && overlappingBooking.EndBookingDate.HasValue)
                {
                    currentStartTime = TimeOnly.FromTimeSpan(overlappingBooking.EndBookingDate.Value.TimeOfDay);
                    continue; // Continue to the next iteration
                }
            }

            // Increment the current start time by 2 hours
            currentStartTime = currentStartTime.AddHours(2);
        }

        // Return the list of available time slots
        return availableSlots;
    }


    public async Task<BookingDto> AddBookingAsync(BookingSaveDto model)
    {
        // Validate service existence
        var service = await _context.Services.FirstOrDefaultAsync(x => x.Id == model.ServiceId);
        if (service == null) throw new KeyNotFoundException($"Service with id {model.ServiceId} not found.");

        // Find an available car for the booking date and time
        var availableCar = await _context.Cars
            .Where(c => !c.IsDeleted && // Check if the car is Deleted
                !_context.Bookings.Any(b =>
                    b.CarId == c.Id && // Check if the car is booked
                    b.BookingDate < model.EndBookingDate && // Check for overlapping bookings
                    b.EndBookingDate > model.BookingDate) // Ensure the booking does not overlap
            )
            .FirstOrDefaultAsync();

        if (availableCar == null) throw new Exception("No available cars for the selected time slot.");

        // Map the BookingSaveDto to the Booking entity
        var booking = _mapper.Map<Booking>(model);

        // Set the CarId to the found available car
        booking.CarId = availableCar.Id; // Assign the available car's ID to the booking

        // Validate booking conditions
        ValidateBookingConditionsAsync(booking);

        // Set additional booking properties
        booking.CreateDate = DateTime.UtcNow;
        booking.CreatedById = GetCurrentUserId();
        booking.BookingStatus = BookingStatus.New;

        // Add the booking to the context and save changes
        _context.Bookings.Add(booking);
        await _context.SaveChangesAsync();

        // Return the mapped BookingDto
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

    public async Task SetBookingStateInProcess(Guid id)
    {
        var booking = await _context.Bookings.FindAsync(id);
        if (booking == null) throw new KeyNotFoundException($"Booking with id {id} not found.");

        booking.BookingStatus = BookingStatus.InProcess;
        booking.UpdatedById = GetCurrentUserId();
        booking.UpdateDate = DateTime.UtcNow;

        var result = await _context.SaveChangesAsync() > 0;
        if (!result) throw new Exception("Failed to change booking status to 'In Process'.");
    }

    public async Task SetBookingStateRejected(Guid id)
    {
        var booking = await _context.Bookings.FindAsync(id);
        if (booking == null) throw new KeyNotFoundException($"Booking with id {id} not found.");

        booking.BookingStatus = BookingStatus.Rejected;
        booking.UpdatedById = GetCurrentUserId();
        booking.UpdateDate = DateTime.UtcNow;

        var result = await _context.SaveChangesAsync() > 0;
        if (!result) throw new Exception("Failed to change booking status to 'Rejected'.");
    }

    public async Task SetBookingStateFinished(Guid id)
    {
        var booking = await _context.Bookings.FindAsync(id);
        if (booking == null) throw new KeyNotFoundException($"Booking with id {id} not found.");

        booking.BookingStatus = BookingStatus.Finished;
        booking.EndBookingDate = DateTime.UtcNow;
        booking.UpdatedById = GetCurrentUserId();
        booking.UpdateDate = DateTime.UtcNow;

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
        // Check if the Service ID is provided
        if (booking.ServiceId == null || booking.ServiceId == Guid.Empty)
            throw new InvalidOperationException("Service ID is required.");

        // Check if the BookingDate is in the future
        if (booking.BookingDate.HasValue && booking.BookingDate.Value < DateTime.UtcNow)
            throw new InvalidOperationException("Booking date must be in the future.");

        // Check if the EndBookingDate is at least 30 minutes after the BookingDate
        if (booking.EndBookingDate.HasValue && booking.BookingDate.HasValue &&
            booking.EndBookingDate.Value <= booking.BookingDate.Value.AddMinutes(30))
        {
            throw new InvalidOperationException("EndBookingDate must be at least 30 minutes after BookingDate.");
        }
    }

}
