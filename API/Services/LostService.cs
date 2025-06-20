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

public class LostService : ILostService
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;

    private readonly IEmailService _emailService;

    private readonly IHttpContextAccessor _httpContextAccessor;

    private readonly IFileService _fileService;

    public LostService(DataContext context, IMapper mapper, IHttpContextAccessor httpContextAccessor, IEmailService emailService, IFileService fileService)
    {
        _fileService = fileService;
        _context = context;
        _mapper = mapper;
        _httpContextAccessor = httpContextAccessor;
        _emailService = emailService;

    }

    public async Task<PagedList<LostDto>> GetAllLostItemsAsync(LostParams lostParams)
    {
        var query = _context.Losts
            .Where(x => !x.IsDeleted)
            .Include(x => x.CreatedBy)
            .Include(x => x.UpdatedBy)
            .Include(x => x.FileEntities)
            .AsNoTracking()
                        .OrderByDescending(x => x.CreateDate)
            .AsQueryable();

        if (!string.IsNullOrEmpty(lostParams.SearchTerm))
        {
            query = query.Where(x => x.Name.Contains(lostParams.SearchTerm) || x.Comments.Contains(lostParams.SearchTerm));
        }

        if (lostParams.From != null)
        {
            query = query.Where(x => x.LostDate >= lostParams.From);
        }

        if (lostParams.To != null)
        {
            var toDate = lostParams.To.Value.AddDays(1);
            query = query.Where(x => x.LostDate <= toDate);
        }
        if (lostParams.LostStatus != null)
        {
            query = query.Where(x => x.Status == lostParams.LostStatus);
        }

        return await PagedList<LostDto>.CreateAsync(
            query.ProjectTo<LostDto>(_mapper.ConfigurationProvider),
            lostParams.PageNumber,
            lostParams.PageSize);
    }

    public async Task<LostDto> GetLostItemByIdAsync(Guid id)
    {
        var lostItem = await _context.Losts.Include(x => x.CreatedBy).Include(x => x.UpdatedBy)
            .FirstOrDefaultAsync(x => x.Id == id);

        if (lostItem == null)
        {
            throw new KeyNotFoundException($"Lost item with id {id} not found.");
        }

        return _mapper.Map<LostDto>(lostItem);
    }



    public async Task SetLostStateInProcess(Guid id, string remark)
    {
        var lost = await _context.Losts.FindAsync(id);
        if (lost == null) throw new KeyNotFoundException($"Lost with id {id} not found.");

        lost.Status = LostStatus.InProcess;
        lost.Remarks += $"\n[{DateTime.Now:dd-MM-yyyy HH:mm}] {remark}";
        lost.UpdatedById = GetCurrentUserId();
        lost.UpdateDate = TimeHelper.GetCurrentTimeInAbuDhabi();

        var result = await _context.SaveChangesAsync() > 0;
        if (!result) throw new Exception("Failed to change Lost status to 'InProcess'.");
    }

    public async Task SetLosttateCompleted(Guid id)
    {
        var lost = await _context.Losts.FindAsync(id);
        if (lost == null) throw new KeyNotFoundException($"Losts with id {id} not found.");

        lost.Status = LostStatus.Completed;
        lost.UpdatedById = GetCurrentUserId();
        lost.UpdateDate = TimeHelper.GetCurrentTimeInAbuDhabi();

        var result = await _context.SaveChangesAsync() > 0;
        if (!result) throw new Exception("Failed to change Lost laint status to 'Completed'.");
    }


    public async Task<LostDto> AddLostItemAsync(LostSaveDto model)
    {
        var lostItem = _mapper.Map<Lost>(model);

        lostItem.CreateDate = DateTime.UtcNow;

        _context.Losts.Add(lostItem);
        
        var result = await _context.SaveChangesAsync() > 0;

        if (result)
        {
            try
            {
                // Prepare the email body for the customer
                string customerBody = $@"
                    <p>Dear {lostItem.Name},</p>
                    <p>We wanted to confirm the following lost item report:</p>
                    <h3>Lost Confirmation</h3>
                    <p>
                        <strong>Lost Department:</strong> {lostItem.LostDepartment}<br/>
                        <strong>Lost Date:</strong> {lostItem.LostDate}<br/>
                        <strong>Lost Comments:</strong> {lostItem.Comments}<br/>
                        <strong>Lost Status:</strong> {lostItem.Status}<br/>
                    </p>
                    <p>Thank you for reporting the issue. Our team will reach out to you shortly.</p>
                    <p>Best regards,<br/>KBC Team</p>
                    <p>
                        <small>
                            This email was sent on {DateTime.Now:dd-MM-yyyy hh:mm tt}.
                        </small>
                    </p>";

                // Send email to the customer
                await _emailService.SendEmailAsync(lostItem.Email, "Lost Item Confirmation", customerBody);

                // Prepare the email body for the coordinator (admin)
                string coordinatorBody = $@"
                    <p>Dear Admin,</p>
                    <p>A new lost item has been reported. Below are the details:</p>
                    <h3>Lost Item Report</h3>
                    <p>
                        <strong>Lost Department:</strong> {lostItem.LostDepartment}<br/>
                        <strong>Customer Name:</strong> {lostItem.Name}<br/>
                        <strong>Lost Date:</strong> {lostItem.LostDate}<br/>
                        <strong>Lost Comments:</strong> {lostItem.Comments}<br/>
                        <strong>Lost Status:</strong> {lostItem.Status}<br/>

                    </p>
                    <p>Please follow up with the customer and address the issue as needed.</p>
                    <p>Best regards,<br/>Your Team</p>
                    <p>
                        <small>
                            This email was sent on {DateTime.Now:dd-MM-yyyy hh:mm tt}.
                        </small>
                    </p>";

                string coordinatorEmail = "inquiry@ess.ae";
                await _emailService.SendEmailAsync(coordinatorEmail, "New Lost Item Report", coordinatorBody);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error sending notification or email: {ex.Message}");
            }

            return _mapper.Map<LostDto>(lostItem);
        }
        else
        {
            throw new Exception("An error occurred while saving the lost item.");
        }
    }



    public async Task<string> UploadImage(FileUploadNewDto model)
    {
        var lost = await _context.Losts
            .Include(x => x.FileEntities)
            .FirstOrDefaultAsync(x => x.Id == model.EntityId);

        if (lost == null) return null!;

        // Case 1: Update existing files if they exist
        if (lost.FileEntities?.Count > 0 && model.number != null)
        {
            var fileEntitiesList = lost.FileEntities.ToList();

            if (model.Files.Count == 1 &&
              int.TryParse(model.number, out var number) &&
              number > 0 &&
              lost.FileEntities.Count >= number)
            {
                var updatedFile = await _fileService.UpdateFileAsync(
                fileEntitiesList[Convert.ToInt32(model.number) - 1].Id,
                model.Files[0],
                model.directory,
                isImage: true
            );

                var fileEntity = await _fileService.GetFileByIdAsync(updatedFile.Id);
                fileEntity.LostId = model.EntityId;
            }
            else
            {
                for (int i = 0; i < model.Files.Count; i++)
                {
                    if (i < fileEntitiesList.Count &&
              int.TryParse(model.number, out var num) &&
              num > 0 &&
              lost.FileEntities?.Count >= num)
                    {

                        var updatedFile = await _fileService.UpdateFileAsync(
                                                fileEntitiesList[i].Id,
                                                model.Files[i],
                                                model.directory,
                                                isImage: true
                                            );

                        // Ensure the lostId is properly set
                        var fileEntity = await _fileService.GetFileByIdAsync(updatedFile.Id);
                        fileEntity.LostId = model.EntityId;


                    }
                    else
                    {
                        var createdFile = await _fileService.SaveFileEntityAsync(model.Files[0], model.directory, isImage: true);
                        // Add new file if model.Files has more files than existing FileEntities
                        var newFileEntity = new FileEntity
                        {
                            Id = createdFile.Id,
                            FileName = createdFile.FileName ?? "",
                            FilePath = createdFile.FilePath ?? "",
                            ContentType = createdFile.ContentType ?? "",
                            Size = createdFile.Size,
                            LostId = model.EntityId,
                            CreateDate = TimeHelper.GetCurrentTimeInAbuDhabi(),
                            CreatedById = GetCurrentUserId()
                        };

                        // Check if the entity is already being tracked
                        var existingEntity = _context.ChangeTracker.Entries<FileEntity>()
                            .FirstOrDefault(e => e.Entity.Id == newFileEntity.Id);

                        if (existingEntity != null)
                        {
                            // If already tracked, detach the existing instance
                            _context.Entry(existingEntity.Entity).State = EntityState.Detached;
                        }

                        // Ensure the new entity is not being tracked before adding
                        _context.Entry(newFileEntity).State = EntityState.Detached;

                        // Add the new file entity to the lost
                        lost.FileEntities?.Add(newFileEntity);
                    }

                }
            }


        }
        else
        {
            // Case 2: Save new files if no existing FileEntities
            foreach (var file in model.Files)
            {
                var createdFile = await _fileService.SaveFileEntityAsync(file, model.directory, isImage: true);

                // Map FileResponseDto to FileEntity
                var newFileEntity = new FileEntity
                {
                    Id = createdFile.Id,
                    FileName = createdFile.FileName ?? "",
                    FilePath = createdFile.FilePath ?? "",
                    ContentType = createdFile.ContentType ?? "",
                    Size = createdFile.Size,
                    LostId = model.EntityId,
                    CreateDate = TimeHelper.GetCurrentTimeInAbuDhabi(),
                    CreatedById = GetCurrentUserId()
                };

                // Detach the new entity if already tracked
                var trackedEntity = _context.ChangeTracker.Entries<FileEntity>()
                    .FirstOrDefault(e => e.Entity.Id == newFileEntity.Id);

                if (trackedEntity != null)
                {
                    _context.Entry(trackedEntity.Entity).State = EntityState.Detached;
                }

                lost.FileEntities?.Add(newFileEntity);
            }

        }

        await _context.SaveChangesAsync();

        // Return the path of the first file or a default path
        return lost.FileEntities?.FirstOrDefault()?.FilePath ?? "assets/img/Amer Services.png";
    }


    public async Task DeleteLostItemAsync(Guid id)
    {
        var lostItem = await _context.Losts.FindAsync(id);

        if (lostItem == null)
        {
            throw new KeyNotFoundException($"Lost item with id {id} not found.");
        }

        lostItem.IsDeleted = true;
        await _context.SaveChangesAsync();
    }

    public Task UpdateLostItemAsync(Guid id, LostSaveDto lostSaveDto)
    {
        throw new NotImplementedException();
    }

    public Task<List<LostDto>> GetFoundLostItemsAsync()
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