using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.DTOs.LostDto;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using API.RequestParams;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

public class ComplaintService : ICompalintService
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;

    private readonly IEmailService _emailService;

    private readonly IHttpContextAccessor _httpContextAccessor;

    public ComplaintService(DataContext context, IMapper mapper, IHttpContextAccessor httpContextAccessor, IEmailService emailService)
    {
        _context = context;
        _mapper = mapper;
        _httpContextAccessor = httpContextAccessor;
        _emailService = emailService;

    }

    public async Task<PagedList<ComplaintDto>> GetAllComplaintItemsAsync(ComplaintParams complaintParams)
    {
        var query = _context.Complaints
            .Where(x => !x.IsDeleted)
            .Include(x => x.CreatedBy)
            .Include(x => x.UpdatedBy)
            .AsNoTracking()
            .AsQueryable();

        if (!string.IsNullOrEmpty(complaintParams.SearchTerm))
        {
            query = query.Where(x => x.Name.Contains(complaintParams.SearchTerm) || x.Comments.Contains(complaintParams.SearchTerm));
        }

        if (complaintParams.From != null)
        {
            query = query.Where(x => x.CreateDate >= complaintParams.From);
        }

        if (complaintParams.To != null)
        {
            var toDate = complaintParams.To.Value.AddDays(1);
            query = query.Where(x => x.CreateDate <= toDate);
        }
        if (complaintParams.ComplaintStatus != null)
        {
            query = query.Where(x => x.Status == complaintParams.ComplaintStatus);
        }

         if (complaintParams.Type != "null")
            {
                bool IsComplaint=complaintParams.Type=="true"?true:false;
                query = query.Where(x => x.IsComplaint ==IsComplaint);
            }

        return await PagedList<ComplaintDto>.CreateAsync(
            query.ProjectTo<ComplaintDto>(_mapper.ConfigurationProvider),
            complaintParams.PageNumber,
            complaintParams.PageSize);
    }

    public async Task<ComplaintDto> GetComplaintItemByIdAsync(Guid id)
    {
        var complaintItem = await _context.Complaints.Include(x => x.CreatedBy).Include(x => x.UpdatedBy)
            .FirstOrDefaultAsync(x => x.Id == id);

        if (complaintItem == null)
        {
            throw new KeyNotFoundException($"Complaint item with id {id} not found.");
        }

        return _mapper.Map<ComplaintDto>(complaintItem);
    }



    public async Task SetComplaintStateInProcess(Guid id)
    {
        var complaint = await _context.Complaints.FindAsync(id);
        if (complaint == null) throw new KeyNotFoundException($"Complaint with id {id} not found.");

        complaint.Status = ComplaintStatus.InProcess;
        complaint.UpdatedById = GetCurrentUserId();
        complaint.UpdateDate = TimeHelper.GetCurrentTimeInAbuDhabi();

        var result = await _context.SaveChangesAsync() > 0;
        if (!result) throw new Exception("Failed to change Complaint status to 'InProcess'.");
    }

    public async Task SetComplaintStateCompleted(Guid id)
    {
        var complaint = await _context.Complaints.FindAsync(id);
        if (complaint == null) throw new KeyNotFoundException($"Complaint with id {id} not found.");

        complaint.Status = ComplaintStatus.Completed;
        complaint.UpdatedById = GetCurrentUserId();
        complaint.UpdateDate = TimeHelper.GetCurrentTimeInAbuDhabi();

        var result = await _context.SaveChangesAsync() > 0;
        if (!result) throw new Exception("Failed to change Complaint status to 'Completed'.");
    }


    public async Task<ComplaintDto> AddComplaintItemAsync(ComplaintSaveDto model)
    {
        var complaintItem = _mapper.Map<Complaint>(model);

        complaintItem.CreateDate = DateTime.UtcNow;

        _context.Complaints.Add(complaintItem);
        var result = await _context.SaveChangesAsync() > 0;

        if (result)
        {
            try
            {
                // Prepare the email body for the customer
                string customerBody = $@"
                    <p>Dear {complaintItem.Name},</p>
                    <p>Thank you for bringing this matter to our attention. Below are the details of your reported {(model.IsComplaint ? "complaint" : "suggestion")}:</p>
                    <h3>{(model.IsComplaint ? "complaint" : "suggestion")} Details</h3>
                    <p>
                        <strong>Department:</strong> {complaintItem.Department}<br/>
                        <strong>Date Submitted:</strong> {DateTime.UtcNow}<br/>
                        <strong>Comments:</strong> {complaintItem.Comments}<br/>
                        <strong>Status:</strong> {complaintItem.Status}<br/>
                    </p>
                    <p>We value your feedback and will ensure that your {(model.IsComplaint ? "complaint" : "suggestion")} is addressed promptly. Please feel free to contact us if you need further assistance or have additional information to provide.</p>
                    <p>Best regards,<br/>KBC Support Team</p>
                    <p>
                        <small>
                            This email was sent on {DateTime.Now:dd-MM-yyyy hh:mm tt}.
                        </small>
                    </p>";

                // Send email to the customer
                await _emailService.SendEmailAsync(complaintItem.Email, "Complaint Item Confirmation", customerBody);

                // Prepare the email body for the coordinator (admin)
                string coordinatorBody = $@"
                    <p>Dear Admin,</p>
                    <p>A new customer {(model.IsComplaint ? "complaint" : "suggestion")} has been submitted. Please review the details below:</p>
                    <h3>{(model.IsComplaint ? "complaint" : "suggestion")} Summary</h3>
                    <p>
                        <strong>Department:</strong> {complaintItem.Department}<br/>
                        <strong>Customer Name:</strong> {complaintItem.Name}<br/>
                        <strong>Date Submitted:</strong> {DateTime.UtcNow}<br/>
                        <strong>Comments:</strong> {complaintItem.Comments}<br/>
                        <strong>Status:</strong> {complaintItem.Status}<br/>
                    </p>
                    <p>Kindly follow up with the customer and take appropriate action to resolve the issue. Ensure to update the system with progress and resolution details.</p>
                    <p>Best regards,<br/>KBC Notification System</p>
                    <p>
                        <small>
                            This email was sent on {DateTime.Now:dd-MM-yyyy hh:mm tt}.
                        </small>
                    </p>";


                string coordinatorEmail = "inquiry@ess.ae";
                await _emailService.SendEmailAsync(coordinatorEmail, "New Complaint Item Report", coordinatorBody);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error sending notification or email: {ex.Message}");
            }

            return _mapper.Map<ComplaintDto>(complaintItem);
        }
        else
        {
            throw new Exception("An error occurred while saving the complaint item.");
        }
    }


    public async Task DeleteComplaintItemAsync(Guid id)
    {
        var complaintItem = await _context.Complaints.FindAsync(id);

        if (complaintItem == null)
        {
            throw new KeyNotFoundException($"Complaint item with id {id} not found.");
        }

        complaintItem.IsDeleted = true;
        await _context.SaveChangesAsync();
    }

    public Task UpdateComplaintItemAsync(Guid id, ComplaintSaveDto complaintSaveDto)
    {
        throw new NotImplementedException();
    }

    public Task<List<ComplaintDto>> GetFoundComplaintItemsAsync()
    {
        throw new NotImplementedException();
    }

    private string GetCurrentUserId()
    {
        return _httpContextAccessor
            .HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value
                ?? null!;
    }
}
