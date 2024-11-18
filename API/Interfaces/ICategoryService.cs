using API.DTOs.ServiceDto;

namespace API.Interfaces
{
    public interface ICategoryService
    {
        Task<List<CategoryDto>> GetAllCategoriesAsync();
        Task DeleteCategoryAsync(Guid id);
        Task<CategoryDto> AddCategoryAsync(CategorySaveDto model);
        Task<CategoryDto> GetCategoryByIdAsync(Guid id);
    }
}