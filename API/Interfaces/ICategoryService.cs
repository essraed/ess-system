using API.DTOs.ServiceDto;
using API.Helpers;
using API.RequestParams;

namespace API.Interfaces
{
    public interface ICategoryService
    {
        Task<PagedList<CategoryDto>> GetAllCategoriesAsync(CategoryParams categoryParams);
        Task DeleteCategoryAsync(Guid id);
        Task<CategoryDto> AddCategoryAsync(CategorySaveDto model, IFormFile pictureFile);
        Task<CategoryDto> GetCategoryByIdAsync(Guid id);
        Task<List<CategoryDto>> GetAllCategoriesForDropdownAsync();
    }
}