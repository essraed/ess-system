using System.Security.Claims;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using API.RequestParams;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

public class EventPROService : IEventPROService
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;
    private readonly IHttpContextAccessor _httpContextAccessor;

    private readonly IEmailService _emailService;


     public EventPROService(DataContext context, IMapper mapper, IEmailService emailService)
        {
              _emailService = emailService;
            _context = context;
            _mapper = mapper;
        }
private string GenerateUniqueCode()
{
    // You can generate a GUID and use its string representation as a unique code
    return "EVT-" + Guid.NewGuid().ToString("N").Substring(0, 8).ToUpper(); 
}
 public async Task<PagedList<EventPRODto>> GetAllEvents(EventPROParams contactParams)
        {
            var query = _context.Events
                .AsNoTracking()
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(contactParams.SearchTerm))
            {
                var searchTerm = contactParams.SearchTerm.Trim().ToLower();
                query = query.Where(x => x.EmployeeName.ToLower().Contains(searchTerm));
            }

            return await PagedList<EventPRODto>.CreateAsync(
                query.ProjectTo<EventPRODto>(_mapper.ConfigurationProvider),
                contactParams.PageNumber,
                contactParams.PageSize);
        }

  public async Task<EventPRODto> AddEventPROAsync(EventPROSaveDto model)
    {
        if (await _context.EventPROs.AnyAsync(x => x.Email == model.Email))
        {
            throw new Exception("Already submitted.");
        }

        var events = _mapper.Map<EventPRO>(model);

                   string uniqueCode = GenerateUniqueCode();

        // Assign the unique code to the model
             events.PROCode = uniqueCode;

        events.CreateDate = TimeHelper.GetCurrentTimeInAbuDhabi();

        _context.EventPROs.Add(events);

        var result = await _context.SaveChangesAsync() > 0;


        if (result)
        {
            try
            {
                // Preparing Email Body
                string _body = $@" 
                    <p>Dear Admin,</p>
                    <p>We wanted to inform you about the following update:</p>
                    <h3 style='color: #0056b3;'>Booking Confirmation</h3>
                    <table style='border-collapse: collapse; width: 100%; margin-top: 10px;'>
                        <tr>
                            <td style='font-weight: bold; padding: 8px; border: 1px solid #ddd;'>Booking ID:</td>
                            <td style='padding: 8px; border: 1px solid #ddd;'>{events.PROCode}</td>
                        </tr>
                        <tr>
                            <td style='font-weight: bold; padding: 8px; border: 1px solid #ddd;'>Customer Name:</td>
                            <td style='padding: 8px; border: 1px solid #ddd;'>{events.PROName}</td>
                        </tr>
                        <tr>
                            <td style='font-weight: bold; padding: 8px; border: 1px solid #ddd;'>Event Date:</td>
                            <td style='padding: 8px; border: 1px solid #ddd;'> 15-03-2025 </td>
                        </tr>
                    </table>
                    <p style='margin-top: 20px;'>Thank you for your participation.</p>
                    <p>Best regards,<br/>KBC Management</p>
                    <p style='margin-top: 30px; font-size: 12px; color: #888;'>
                        <small>
                            This email was sent on {DateTime.Now:dd-MM-yyyy hh:mm tt}.
                        </small>
                    </p>";

                // Sending Email
                await _emailService.SendEmailAsync(events.Email, "Event Confirmation", _body);
                string _coordinatorBody = $@"
                    <p>Dear {events.PROName},</p>
                    <p>Thank you for the registration:</p>
                    <h3 style='color: #0056b3;'>Event Confirmation Details</h3>
                    <table style='border-collapse: collapse; width: 100%; margin-top: 10px;'>
                        <tr>
                            <td style='font-weight: bold; padding: 8px; border: 1px solid #ddd;'>Event Code:</td>
                            <td style='padding: 8px; border: 1px solid #ddd;'>{events.PROCode}</td>
                        </tr>
                        <tr>
                            <td style='font-weight: bold; padding: 8px; border: 1px solid #ddd;'>PRO Name:</td>
                            <td style='padding: 8px; border: 1px solid #ddd;'>{events.PROName}</td>
                        </tr>
                        <tr>
                            <td style='font-weight: bold; padding: 8px; border: 1px solid #ddd;'>Event Date & Location:</td>
                            <td style='padding: 8px; border: 1px solid #ddd;'>15-03-2025 , Pullman Dubai Creek City Centre</td>
                        </tr>
                    </table>
                    <p style='margin-top: 20px;'>Please ensure that the customer receives their booking confirmation and all the necessary follow-up actions are completed.</p>
                    <p>Best regards,<br/>KBC Team</p>
                    <p style='margin-top: 30px; font-size: 12px; color: #888;'>
                        <small>
                            This email was sent on {DateTime.Now:dd-MM-yyyy hh:mm tt}.
                        </small>
                    </p>";


            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error sending notification or email: {ex.Message}");
            }

        }

        return _mapper.Map<EventPRODto>(events);
    }

    private string GetCurrentUserId()
    {
        return _httpContextAccessor
            .HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value
                ?? null!;
    }
}
