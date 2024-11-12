using System.Security.Claims;
using API.Data;
using API.DTOs.ServiceDto;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

public class CategoryService : ICategoryService
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;
    private readonly IHttpContextAccessor _httpContextAccessor;


    public CategoryService(DataContext context, IMapper mapper,
        IHttpContextAccessor httpContextAccessor)
    {
        _context = context;
        _mapper = mapper;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task<List<CategoryDto>> GetAllCategoriesAsync()
    {
        return _mapper.Map<List<CategoryDto>>(
            await _context.Categories
            .Include(x => x.CreatedBy)
            .Where(x => !x.IsDeleted)
            .ToListAsync());
    }

    public async Task<CategoryDto> GetCategoryByIdAsync(Guid id)
    {
        var category = await _context.Categories
            .Include(x => x.Services).FirstOrDefaultAsync(x => x.Id == id);
        
        if (category == null)
        {
            throw new KeyNotFoundException($"Category with id {id} not found.");
        }
        
        return _mapper.Map<CategoryDto>(category);
    }

    public async Task<CategoryDto> AddCategoryAsync(CategorySaveDto model)
    {
        if (await _context.Categories.AnyAsync(x => x.Name == model.Name))
        {
            throw new Exception("Category already exists.");
        }

        var category = _mapper.Map<Category>(model);

        category.CreateDate = TimeHelper.GetCurrentTimeInAbuDhabi();
        category.CreatedById = GetCurrentUserId();

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
