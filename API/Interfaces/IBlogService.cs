using API.DTOs;
using API.Helpers;
using API.RequestParams;

namespace API.Interfaces
{
    public interface IBlogService
    {
        Task<PagedList<BlogDetailsDto>> GetAllBlogsAsync(BlogParams blogParams);
        Task<BlogDetailsDto> GetBlogByIdAsync(Guid id);
        Task<BlogDetailsDto> AddBlogAsync(BlogSaveDto model);
        Task<string> UploadImage(FileUploadNewDto model);
        Task<string> UploadImageForPost(FileUploadNewDto model);
        Task DeleteBlogAsync(Guid id);
    }
}