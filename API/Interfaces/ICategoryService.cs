

using API.DTOs;
using API.DTOs.ServiceDto;
using API.Helpers;
using API.RequestParams;

namespace API.Interfaces
{
    public interface ICategoryService
    {
        Task<PagedList<CategoryDto>> GetAllCategoriesAsync(CategoryParams categoryParams);
        Task DeleteCategoryAsync(Guid id);
        Task<CategoryDto> AddCategoryAsync(CategorySaveDto model);
        Task<CategoryDto> GetCategoryByIdAsync(Guid id);
        Task<List<CategoryDto>> GetAllCategoriesForDropdownAsync();
        Task<string> UploadImage(FileUploadNewDto model);
    }
}