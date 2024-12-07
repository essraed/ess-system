using System.Security.Claims;
using API.Data;
using API.DTOs;
using API.DTOs.ServiceDto;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using API.RequestParams;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
public class ServiceService : IServiceService
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly IFileService _fileService;


    public ServiceService(DataContext context, IMapper mapper,
        IHttpContextAccessor httpContextAccessor, IFileService fileService)
    {
        _context = context;
        _mapper = mapper;
        _fileService = fileService;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task<PagedList<ServiceDto>> GetAllServicesAsync(ServiceParams serviceParams)
    {
        var query = _context.Services
            .Where(x => !x.IsDeleted)
            .Include(x => x.CreatedBy)
            .Include(x => x.UpdatedBy)
            .Include(x => x.ServiceOptions)
            .Include(x => x.Category)
            .Include(x => x.FileEntity)
            .AsNoTracking()
            .AsQueryable();

        if (serviceParams.CategoryId != Guid.Empty && serviceParams.CategoryId != null)
        {
            query = query.Where(x => x.CategoryId == serviceParams.CategoryId);
        }

        if (!string.IsNullOrEmpty(serviceParams.SearchTerm))
        {
            query = query.Where(x => x.Name.Contains(serviceParams.SearchTerm));
        }

        if (!string.IsNullOrEmpty(serviceParams.UserId))
        {
            query = query.Where(x => x.CreatedById == serviceParams.UserId);
        }

        if (serviceParams.From != null)
        {
            query = query.Where(x => x.CreateDate >= serviceParams.From);
        }

        if (serviceParams.To != null)
        {
            var toDate = serviceParams.To.Value.AddDays(1);
            query = query.Where(x => x.CreateDate <= toDate);
        }

        return await PagedList<ServiceDto>.CreateAsync(
            query.ProjectTo<ServiceDto>(_mapper.ConfigurationProvider),
            serviceParams.PageNumber,
            serviceParams.PageSize);
    }

    public async Task<ServiceDto> GetServiceByIdAsync(Guid id)
    {
        var service = await _context.Services
            .Include(x => x.CreatedBy)
            .Include(x => x.UpdatedBy)
            .Include(x => x.ServiceOptions)
            .Include(x => x.Category)
            .Include(x => x.FileEntity)
            .FirstOrDefaultAsync(x => x.Id == id);

        if (service == null)
        {
            throw new KeyNotFoundException($"Service with id {id} not found.");
        }

        return _mapper.Map<ServiceDto>(service);
    }

    public async Task<string> UploadImage(FileUploadNewDto model)
    {
        var service = await _context.Services
            .Include(x => x.FileEntity)
            .FirstOrDefaultAsync(x => x.Id == model.EntityId);

        if (service is not null)
        {
            if (service.FileEntity is not null)
            {
                var fileToUpdate = await _fileService.UpdateImageAsync(service.FileEntity.Id, model.Files[0], model.directory);

                var file = await _fileService.GetFileByIdAsync(fileToUpdate.Id);
                file.ServiceId = model.EntityId;

                await _context.SaveChangesAsync();

                return fileToUpdate.FilePath!;
            }
            else
            {
                var createdFiles = await _fileService.SaveImagesAsync(model.Files, model.directory);
                createdFiles.ForEach(async item =>
                {
                    var file = await _fileService.GetFileByIdAsync(item.Id);
                    file.ServiceId = model.EntityId;

                });
                
                await _context.SaveChangesAsync();

                return createdFiles[0].FilePath!;
            }
        }
        return null!;
    }

    public async Task<ServiceDto> AddServiceAsync(Guid categoryId, ServiceSaveDto model)
    {


        if (await _context.Services.AnyAsync(x => x.Name == model.Name && x.IsDeleted == false))
        {
            throw new Exception("Service already exists.");
        }

        // if (model.Price >= model.PriceVIP)
        // {
        //     throw new Exception("Service center service price must be less than home service price");
        // }

        var category = await _context.Categories.FirstOrDefaultAsync(x => x.Id == categoryId);

        if (category == null)
        {
            throw new KeyNotFoundException($"Category with id {categoryId} not found.");
        }


        //var pictureUrl = UploadingImages.StoreFile(pictureFile);

        var service = _mapper.Map<Service>(model);

        service.CategoryId = categoryId;
        service.CreateDate = TimeHelper.GetCurrentTimeInAbuDhabi();
        service.CreatedById = GetCurrentUserId();
        //service.PictureUrl =UploadingImages.GetImagePath(pictureUrl);

        _context.Services.Add(service);

        await _context.SaveChangesAsync();

        return _mapper.Map<ServiceDto>(service);
    }

    public async Task UpdateServiceAsync(Guid id, ServiceSaveDto model)
    {
        var service = await _context.Services.FindAsync(id);

        if (service == null)
        {
            throw new KeyNotFoundException($"Service with id {id} not found.");
        }

        // delete all service options.
        await _context.ServiceOptions
            .Where(x => x.ServiceId == id)
            .ExecuteDeleteAsync();

        _mapper.Map(model, service);

        service.UpdateDate = TimeHelper.GetCurrentTimeInAbuDhabi();
        service.UpdatedById = GetCurrentUserId();

        var result = await _context.SaveChangesAsync() > 0;

        if (!result)
        {
            throw new Exception("Failed to update the Service.");
        }
    }

    public async Task DeleteServiceAsync(Guid id)
    {
        var service = await _context.Services.FindAsync(id);

        if (service == null)
        {
            throw new KeyNotFoundException($"Service with id {id} not found.");
        }

        service.IsDeleted = true;

        var result = await _context.SaveChangesAsync() > 0;

        if (!result)
        {
            throw new Exception("Failed to delete the Service.");
        }
    }

    private string GetCurrentUserId()
    {
        return _httpContextAccessor
            .HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value
                ?? null!;
    }

}
