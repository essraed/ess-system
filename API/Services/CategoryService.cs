using System.Globalization;
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
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

public class CategoryService : ICategoryService
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly IFileService _fileService;



    public CategoryService(DataContext context, IMapper mapper,
        IHttpContextAccessor httpContextAccessor, IFileService fileService)
    {
        _fileService = fileService;
        _context = context;
        _mapper = mapper;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task<PagedList<CategoryDto>> GetAllCategoriesAsync(CategoryParams categoryParams)
    {

        var query = _context.Categories
        .Include(x => x.CreatedBy)
        .Include(x => x.FileEntities)
        .Where(x => !x.IsDeleted)
        .Where(x => !x.IsUber)
        .AsNoTracking()
                .AsQueryable();

        if (!string.IsNullOrEmpty(categoryParams.SearchTerm))
        {
            query = query.Where(x => x.Name.Contains(categoryParams.SearchTerm));
        }

        if (!string.IsNullOrEmpty(categoryParams.UserId))
        {
            query = query.Where(x => x.CreatedById == categoryParams.UserId);
        }

        if (categoryParams.From != null)
        {
            query = query.Where(x => x.CreateDate >= categoryParams.From);
        }

        if (categoryParams.To != null)
        {
            var toDate = categoryParams.To.Value.AddDays(1);
            query = query.Where(x => x.CreateDate <= toDate);
        }

        return await PagedList<CategoryDto>.CreateAsync(
            query.ProjectTo<CategoryDto>(_mapper.ConfigurationProvider),
            categoryParams.PageNumber,
            categoryParams.PageSize);

    }
    public async Task<List<CategoryDto>> GetAllCategoriesForDropdownAsync()
    {
        return _mapper.Map<List<CategoryDto>>(await _context.Categories.Where(c=>!c.IsDeleted).ToListAsync());
    }

    public async Task<CategoryDto> GetCategoryByIdAsync(Guid id)
    {
        var category = await _context.Categories
        .Include(x => x.Services)
        .Include(x => x.FileEntities)
        .Include(x => x.CreatedBy)
        .FirstOrDefaultAsync(x => x.Id == id);

        if (category == null)
        {
            throw new KeyNotFoundException($"Category with id {id} not found.");
        }

        return _mapper.Map<CategoryDto>(category);
    }

    public async Task<string> UploadImage(FileUploadNewDto model)
    {
        var category = await _context.Categories
            .Include(x => x.FileEntities)
            .FirstOrDefaultAsync(x => x.Id == model.EntityId);

        if (category == null) return null!;

        // Case 1: Update existing files if they exist
        if (category.FileEntities?.Count > 0 && model.number != null)
        {
            var fileEntitiesList = category.FileEntities.ToList();

            if (model.Files.Count == 1 &&
              int.TryParse(model.number, out var number) &&
              number > 0 &&
              category.FileEntities.Count >= number)
            {
                var updatedFile = await _fileService.UpdateFileAsync(
                fileEntitiesList[Convert.ToInt32(model.number) - 1].Id,
                model.Files[0],
                model.directory,
                isImage: true
            );

                var fileEntity = await _fileService.GetFileByIdAsync(updatedFile.Id);
                fileEntity.CategoryId = model.EntityId;
            }
            else
            {
                for (int i = 0; i < model.Files.Count; i++)
                {
                    if (i < fileEntitiesList.Count &&
              int.TryParse(model.number, out var num) &&
              num > 0 &&
              category.FileEntities?.Count >= num)
                    {

                        var updatedFile = await _fileService.UpdateFileAsync(
                                                fileEntitiesList[i].Id,
                                                model.Files[i],
                                                model.directory,
                                                isImage: true
                                            );

                        // Ensure the CategoryId is properly set
                        var fileEntity = await _fileService.GetFileByIdAsync(updatedFile.Id);
                        fileEntity.CategoryId = model.EntityId;


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
                            CategoryId = model.EntityId,
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

                        // Add the new file entity to the category
                        category.FileEntities?.Add(newFileEntity);
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
                    CategoryId = model.EntityId,
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

                category.FileEntities?.Add(newFileEntity);
            }

        }

        await _context.SaveChangesAsync();

        // Return the path of the first file or a default path
        return category.FileEntities?.FirstOrDefault()?.FilePath ?? "assets/img/Amer Services.png";
    }
    public async Task<CategoryDto> AddCategoryAsync(CategorySaveDto model)
    {

        if (await _context.Categories.AnyAsync(x => x.Name == model.Name))
        {
            throw new Exception("Category already exists.");
        }
        // var pictureUrl = UploadingImages.StoreFile(pictureFile);

        var category = _mapper.Map<Category>(model);

        category.CreateDate = TimeHelper.GetCurrentTimeInAbuDhabi();
        category.CreatedById = GetCurrentUserId();
        // category.PictureUrl =UploadingImages.GetImagePath(pictureUrl); 

        _context.Categories.Add(category);
        await _context.SaveChangesAsync();

        return _mapper.Map<CategoryDto>(category);
    }



    public async Task DeleteCategoryAsync(Guid id)
    {
        var category = await _context.Categories.FindAsync(id);

        if (category == null)
        {
            throw new KeyNotFoundException($"Category with id {id} not found.");
        }

        category.IsDeleted = true;

        var result = await _context.SaveChangesAsync() > 0;

        if (!result)
        {
            throw new Exception("Failed to delete the Category.");
        }
    }

    private string GetCurrentUserId()
    {
        return _httpContextAccessor
            .HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value
                ?? null!;
    }



}
