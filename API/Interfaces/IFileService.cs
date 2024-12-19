
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IFileService
    {

        Task<string> SaveFileAsync(IFormFile file, string directory, bool isImage = false);

        Task<FileResponseDto> SaveFileEntityAsync(IFormFile file, string directory, bool isImage = false);

        Task<List<FileResponseDto>> SaveFilesAsync(IList<IFormFile> files, string directory);
        Task<List<FileResponseDto>> SaveImagesAsync(IList<IFormFile> images, string directory);

        Task<FileResponseDto> UpdateFileAsync(Guid fileId, IFormFile newFile, string directory, bool isImage = false);

        Task<List<FileResponseDto>> UpdateImageAsync(Guid imageId, IList<IFormFile> newImages, string directory);
        Task DeleteFileAsync(Guid fileId);

        Task DeleteImageAsync(Guid imageId);

        void DeleteFileOrImage(string filePath);

        Task<FileEntity> GetFileByIdAsync(Guid id);
    }
}