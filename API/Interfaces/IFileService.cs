
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IFileService
    {

        Task<List<FileResponseDto>> SaveFilesAsync(IList<IFormFile> files, string directory);

        Task<List<FileResponseDto>> SaveImagesAsync(IList<IFormFile> images, string directory);

        Task<FileResponseDto> UpdateFileAsync(Guid fileId, IFormFile newFile, string directory, bool isImage = false);

        Task<FileResponseDto> UpdateImageAsync(Guid imageId, IFormFile newImage, string directory);

        Task DeleteFileAsync(Guid fileId);

        Task DeleteImageAsync(Guid imageId);

        Task<FileEntity> GetFileByIdAsync (Guid id);
    }
}