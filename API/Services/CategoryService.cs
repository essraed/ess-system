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
        .Include(x => x.FileEntity)
        .Where(x => !x.IsDeleted)
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
        return _mapper.Map<List<CategoryDto>>(await _context.Categories.ToListAsync());
    }

    public async Task<CategoryDto> GetCategoryByIdAsync(Guid id)
    {
        var category = await _context.Categories
        .Include(x => x.Services)
        .Include(x => x.FileEntity)
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
            .Include(x => x.FileEntity)
            .FirstOrDefaultAsync(x => x.Id == model.EntityId);

        if (category is not null)
        {

            if (category.FileEntity is not null)
            {
                var fileToUpdate = await _fileService.UpdateImageAsync(category.FileEntity.Id, model.Files[0], model.directory);

                var file = await _fileService.GetFileByIdAsync(fileToUpdate.Id);
                file.CategoryId = model.EntityId;

                await _context.SaveChangesAsync();

                return fileToUpdate.FilePath!;
            }
            else
            {
                var createdFiles = await _fileService.SaveImagesAsync(model.Files, model.directory);
                createdFiles.ForEach(async item =>
                {
                    var file = await _fileService.GetFileByIdAsync(item.Id);
                    file.CategoryId = model.EntityId;
                });

                await _context.SaveChangesAsync();

                return createdFiles[0].FilePath!;
            }
        }
        return null!;
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
