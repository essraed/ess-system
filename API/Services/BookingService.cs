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
    private readonly INotificationService _notificationService;
    private readonly IFileService _fileService;

    private readonly IEmailService _emailService;
    private readonly Random _random = new Random();

    private readonly string _email = "abed@hotmail.com";
    private string _subject = "Your Notification";


    public async Task<BookingDto?> GetBookingByBookingCodeAsync(string bookingCode)
    {
        var booking = await _context.Bookings
            .Include(b => b.Service)
            .Where(b => b.BookingCode == bookingCode)
            .Select(b => new BookingDto
            {
                Id = b.Id,
                BookingCode = b.BookingCode,
                BookingStatus = b.BookingStatus,
                CustomerName = b.CustomerName,
                Phone = b.Phone,
                Address = b.Address,
                AdultsNumber = b.AdultsNumber,
                ChildrenNumber = b.ChildrenNumber,
                EntryType = b.EntryType,
                Duration = b.Duration,
                Reason = b.Reason,
                ProcessTime = b.ProcessTime,
                TotalPrice = b.TotalPrice,
                BookingDate = b.BookingDate,
                CreateDate = b.CreateDate,
                UpdateDate = b.UpdateDate,
                ServiceName = b.Service!.Name,

            })
            .FirstOrDefaultAsync();

        return booking; // This will return null if no booking is found
    }

    public BookingService(DataContext context, IMapper mapper, IHttpContextAccessor httpContextAccessor,
        IWorkingTimeService workingTimeService, INotificationService notificationService, IEmailService emailService, IFileService fileService)
    {
        _emailService = emailService;
        _mapper = mapper;
        _context = context;
        _notificationService = notificationService;
        _workingTimeService = workingTimeService;
        _httpContextAccessor = httpContextAccessor;
        _fileService = fileService;
    }

    public async Task<PagedList<BookingDto>> GetAllBookingsAsync([FromQuery] BookingParams bookingParams)
    {
        var query = _context.Bookings
        .Include(x => x.CreatedBy)
        .Include(x => x.UpdatedBy)
        .Include(x => x.Service)
            .ThenInclude(s => s.Category)
        .Where(x => !x.IsDeleted &&
                    x.Service.Category.Name != "Visit Visa" &&
                    x.Service.Category.Name != "Pick & Drop")
        .AsNoTracking()
        .OrderByDescending(x => x.CreateDate)
        .AsQueryable();


        if (!string.IsNullOrEmpty(bookingParams.SearchTerm))
        {
            query = query.Where(
                x => x.CustomerName.Contains(bookingParams.SearchTerm) ||
                x.Phone.Contains(bookingParams.SearchTerm) ||
                x.BookingCode.Contains(bookingParams.SearchTerm) ||
                x.BookingCode.Contains(bookingParams.SearchTerm)
                );
        }

        if (bookingParams.BookingStatus != null)
        {
            query = query.Where(x => x.BookingStatus == bookingParams.BookingStatus);
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

        var bookings = query.ProjectTo<BookingDto>(_mapper.ConfigurationProvider);

        return await PagedList<BookingDto>.CreateAsync(bookings, bookingParams.PageNumber, bookingParams.PageSize);
    }

    public async Task<BookingDetilasDto> GetBookingByIdAsync(Guid id)
    {
        var booking = await _context.Bookings
       .Include(x => x.Service)
       .Include(x => x.ServiceOption)
       .Include(x => x.Payment)
       .Include(x => x.CreatedBy)
       .Include(x => x.UpdatedBy)
       .Include(x => x.FileEntities)
       .Include(x => x.Clients)
           .ThenInclude(x => x.FileEntities)
       .FirstOrDefaultAsync(x => x.Id == id);


        if (booking == null)
        {
            throw new KeyNotFoundException($"Booking with id {id} not found.");
        }
        return _mapper.Map<BookingDetilasDto>(booking);
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

        if (workingTimeAvailable == null) throw new Exception("You have set working times.");

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
                        (b.BookingStatus == BookingStatus.InProcess
                        // || b.BookingStatus == BookingStatus.Pending
                        ))
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

                if (overlappingBooking != null && overlappingBooking.BookingStatus == BookingStatus.Completed)
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

        if (service?.isRequiredFiles == false)
        {
            var bookings = _context.Bookings.Where(b => b.BookingDate == booking.BookingDate).ToList();

            if (bookings.Count == 0)
            {
                var availableCar = await _context.Cars
                .Where(c => !c.IsDeleted &&
                    !_context.Bookings.Any(b =>
                        b.CarId == c.Id &&
                        b.BookingDate < booking.EndBookingDate &&
                        b.EndBookingDate > booking.BookingDate))
                .FirstOrDefaultAsync();

                if (availableCar == null) throw new Exception("No available cars for the selected time slot.");

                booking.CarId = availableCar.Id;
            }
            else
            {
                booking.CarId = bookings[0].CarId;
            }
            ValidateBookingConditionsAsync(booking);
        }




        booking.CreateDate = TimeHelper.GetCurrentTimeInAbuDhabi();
        booking.CreatedById = GetCurrentUserId();
        booking.BookingStatus = BookingStatus.Pending;
        booking.BookingCode = GenerateBookingCode();

        _context.Bookings.Add(booking);

        var result = await _context.SaveChangesAsync() > 0;


        if (result)
        {
            try
            {
                // Sending Notification
                await _notificationService.SendNotification(
                    $"Booking {booking.Id} for {booking.CustomerName} is confirmed on {booking.BookingDate?.ToString("dd-MM-yyyy hh:mm tt")}.",
                    "Booking Confirmation",
                    NotificationType.Reminder,
                    $"Booking/view/{booking.Id}",
                    booking.BookingDate);

                // Preparing Email Body
                string _body = $@" 
                    <p>Dear Admin,</p>
                    <p>We wanted to inform you about the following update:</p>
                    <h3 style='color: #0056b3;'>Booking Confirmation</h3>
                    <table style='border-collapse: collapse; width: 100%; margin-top: 10px;'>
                        <tr>
                            <td style='font-weight: bold; padding: 8px; border: 1px solid #ddd;'>Booking ID:</td>
                            <td style='padding: 8px; border: 1px solid #ddd;'>{booking.BookingCode}</td>
                        </tr>
                        <tr>
                            <td style='font-weight: bold; padding: 8px; border: 1px solid #ddd;'>Customer Name:</td>
                            <td style='padding: 8px; border: 1px solid #ddd;'>{booking.CustomerName}</td>
                        </tr>
                        <tr>
                            <td style='font-weight: bold; padding: 8px; border: 1px solid #ddd;'>Booking Date:</td>
                            <td style='padding: 8px; border: 1px solid #ddd;'>{booking.BookingDate?.ToString("dd-MM-yyyy hh:mm tt")}</td>
                        </tr>
                    </table>
                    <p style='margin-top: 20px;'>Thank you for your attention.</p>
                    <p>Best regards,<br/>KBC Team</p>
                    <p style='margin-top: 30px; font-size: 12px; color: #888;'>
                        <small>
                            This email was sent on {DateTime.Now:dd-MM-yyyy hh:mm tt}.
                        </small>
                    </p>";

                // Sending Email
                await _emailService.SendEmailAsync(booking.Email, "Booking Confirmation", _body);
                string _coordinatorBody = $@"
                    <p>Dear Admin,</p>
                    <p>We wanted to inform you about a new booking confirmation. Please review the details below:</p>
                    <h3 style='color: #0056b3;'>Booking Confirmation Details</h3>
                    <table style='border-collapse: collapse; width: 100%; margin-top: 10px;'>
                        <tr>
                            <td style='font-weight: bold; padding: 8px; border: 1px solid #ddd;'>Booking ID:</td>
                            <td style='padding: 8px; border: 1px solid #ddd;'>{booking.BookingCode}</td>
                        </tr>
                        <tr>
                            <td style='font-weight: bold; padding: 8px; border: 1px solid #ddd;'>Customer Name:</td>
                            <td style='padding: 8px; border: 1px solid #ddd;'>{booking.CustomerName}</td>
                        </tr>
                        <tr>
                            <td style='font-weight: bold; padding: 8px; border: 1px solid #ddd;'>Booking Date:</td>
                            <td style='padding: 8px; border: 1px solid #ddd;'>{booking.BookingDate?.ToString("dd-MM-yyyy hh:mm tt")}</td>
                        </tr>
                        <tr>
                            <td style='font-weight: bold; padding: 8px; border: 1px solid #ddd;'>Customer Email:</td>
                            <td style='padding: 8px; border: 1px solid #ddd;'>{booking.Email}</td>
                        </tr>
                    </table>
                    <p style='margin-top: 20px;'>Please ensure that the customer receives their booking confirmation and all the necessary follow-up actions are completed.</p>
                    <p>Best regards,<br/>KBC Team</p>
                    <p style='margin-top: 30px; font-size: 12px; color: #888;'>
                        <small>
                            This email was sent on {DateTime.Now:dd-MM-yyyy hh:mm tt}.
                        </small>
                    </p>";

                string coordinatorEmail = "inquiry@ess.ae";
                await _emailService.SendEmailAsync(coordinatorEmail, "New Booking Report", _coordinatorBody);

            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error sending notification or email: {ex.Message}");
            }

            return _mapper.Map<BookingDto>(booking);
        }


        throw new Exception("");
    }

    public async Task DeleteBookingAsync(Guid id)
    {
        var booking = await _context.Bookings.FindAsync(id);
        if (booking == null) throw new KeyNotFoundException($"Booking with id {id} not found.");

        booking.IsDeleted = true;

        var result = await _context.SaveChangesAsync() > 0;

        if (!result) throw new Exception("Failed to delete the Booking.");
    }



    public async Task setPaymentType(Guid id, string type)
    {
        var booking = await _context.Bookings.FindAsync(id);
        if (booking == null) throw new KeyNotFoundException($"Booking with id {id} not found.");

        booking.PaymentType = type;

        var result = await _context.SaveChangesAsync() > 0;
        if (!result) throw new Exception($"Failed to change booking payment type to {type}.");
    }

    // After payment will change to in process.
    public async Task SetBookingStateInProcess(Guid id)
    {
        var booking = await _context.Bookings.FindAsync(id);
        if (booking == null) throw new KeyNotFoundException($"Booking with id {id} not found.");

        booking.BookingStatus = BookingStatus.InProcess;
        booking.UpdatedById = GetCurrentUserId();
        booking.UpdateDate = TimeHelper.GetCurrentTimeInAbuDhabi();

        var result = await _context.SaveChangesAsync() > 0;
        if (!result) throw new Exception("Failed to change booking status to 'InProcess'.");
    }
    public async Task SetBookingStateCanceled(Guid id, CanceledReason reason)
    {
        var booking = await _context.Bookings.FindAsync(id);
        if (booking == null) throw new KeyNotFoundException($"Booking with id {id} not found.");

        booking.BookingStatus = BookingStatus.Canceled;
        booking.UpdatedById = GetCurrentUserId();
        booking.Reason = reason.Reason;
        booking.UpdateDate = TimeHelper.GetCurrentTimeInAbuDhabi();

        var result = await _context.SaveChangesAsync() > 0;
        if (!result) throw new Exception("Failed to change booking status to 'Canceled'.");
    }

    public async Task SetBookingStatePending(Guid id)
    {
        var booking = await _context.Bookings.FindAsync(id);
        if (booking == null) throw new KeyNotFoundException($"Booking with id {id} not found.");

        booking.BookingStatus = BookingStatus.Pending;
        booking.UpdatedById = GetCurrentUserId();
        booking.UpdateDate = TimeHelper.GetCurrentTimeInAbuDhabi();

        var result = await _context.SaveChangesAsync() > 0;
        if (!result) throw new Exception("Failed to change booking status to 'Pending'.");
    }

    public async Task SetBookingStateCompleted(Guid id)
    {
        var booking = await _context.Bookings.FindAsync(id);
        if (booking == null) throw new KeyNotFoundException($"Booking with id {id} not found.");

        booking.BookingStatus = BookingStatus.Completed;
        booking.EndBookingDate = TimeHelper.GetCurrentTimeInAbuDhabi();
        booking.UpdatedById = GetCurrentUserId();
        booking.UpdateDate = TimeHelper.GetCurrentTimeInAbuDhabi();

        var result = await _context.SaveChangesAsync() > 0;
        if (!result) throw new Exception("Failed to change booking status to 'Completed'.");
    }
    public async Task SetThePaymentIdForBooking(Guid id, string IDS)
    {
        var bookingIds = IDS.Split(',').Select(Guid.Parse).ToList(); // Assuming IDS is a comma-separated string of GUIDs
        var bookingsToUpdate = await _context.Bookings
            .Where(b => bookingIds.Contains(b.Id))
            .ToListAsync();

        foreach (var booking in bookingsToUpdate)
        {
            booking.PaymentId = id;
        }

        await _context.SaveChangesAsync();
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

    public async Task<string> UploadImage(FileUploadNewDto model)
    {
        var service = await _context.Bookings
            .Include(x => x.FileEntities)
            .FirstOrDefaultAsync(x => x.Id == model.EntityId);

        if (service == null) return null!;


        foreach (var file in model.Files)
        {

            bool isImage = file.ContentType.StartsWith("image/");
            string fileDirectory = isImage ? "seed/image/" : "seed/files/";
            var createdFile = await _fileService.SaveFileEntityAsync(file, fileDirectory, isImage, service?.BookingCode);

            var newFileEntity = new FileEntity
            {
                Id = createdFile.Id,
                FileName = createdFile.FileName ?? "",
                FilePath = createdFile.FilePath ?? "",
                ContentType = createdFile.ContentType ?? "",
                Size = createdFile.Size,
                BookingId = model.EntityId,
                CreateDate = TimeHelper.GetCurrentTimeInAbuDhabi(),
                CreatedById = GetCurrentUserId()
            };

            var trackedEntity = _context.ChangeTracker.Entries<FileEntity>()
                .FirstOrDefault(e => e.Entity.Id == newFileEntity.Id);

            if (trackedEntity != null)
            {
                _context.Entry(trackedEntity.Entity).State = EntityState.Detached;
            }

            service?.FileEntities?.Add(newFileEntity);
        }

        await _context.SaveChangesAsync();

        return service?.FileEntities?.FirstOrDefault()?.FilePath ?? "assets/img/Amer Services.png";
    }

    private string GenerateBookingCode()
    {
        string prefix = "BK";
        string datePart = DateTime.UtcNow.ToString("yyMMdd"); // Short date (YYMMDD)
        string randomPart = GenerateRandomString(4); // 4 random characters
        return $"{prefix}-{datePart}-{randomPart}";
    }

    private string GenerateRandomString(int length)
    {
        const string chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // Readable set
        return new string(Enumerable.Range(1, length).Select(_ => chars[_random.Next(chars.Length)]).ToArray());
    }


}
