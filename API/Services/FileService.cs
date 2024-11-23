using System.Security.Claims;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;

namespace API.Services
{
    public class FileService : IFileService
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        private readonly IWebHostEnvironment _environment;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public FileService(IHttpContextAccessor httpContextAccessor, IWebHostEnvironment environment, DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
            _environment = environment;
            _httpContextAccessor = httpContextAccessor;
        }

        // Save files & images into server
        private async Task<string> SaveFileAsync(IFormFile file, string directory, bool isImage = false)
        {
            string uploadPath = Path.Combine(_environment.WebRootPath, directory);

            if (!Directory.Exists(uploadPath))
            {
                Directory.CreateDirectory(uploadPath);
            }

            string uniqueFileName = $"{Guid.NewGuid()}_{file.FileName}";

            string filePath = Path.Combine(uploadPath, uniqueFileName);

            if (isImage && !file.ContentType.StartsWith("image/"))
            {
                throw new Exception("Only image files are allowed.");
            }

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return Path.Combine(directory, uniqueFileName);
        }

        // Save files & Images into server & db.
        public async Task<FileResponseDto> SaveFileEntityAsync(IFormFile file, string directory, bool isImage = false)
        {
            const long maxFileSize = 10 * 1024 * 1024;
            if (file.Length > maxFileSize)
            {
                throw new Exception("File size exceeds the allowed limit of 10MB.");
            }

            string filePath = await SaveFileAsync(file, directory, isImage);

            var fileEntity = new FileEntity
            {
                FileName = Path.GetFileName(filePath),
                FilePath = filePath,
                ContentType = file.ContentType,
                Size = file.Length,
                CreateDate = TimeHelper.GetCurrentTimeInAbuDhabi(),
                CreatedById = GetCurrentUserId(),
            };

            _context.Files.Add(fileEntity);
            await _context.SaveChangesAsync();

            return _mapper.Map<FileResponseDto>(fileEntity);
        }


        // Save files 
        public async Task<List<FileResponseDto>> SaveFilesAsync(IList<IFormFile> files, string directory)
        {
            List<FileResponseDto> fileDtos = new List<FileResponseDto>();

            foreach (var file in files)
            {
                if (file.Length > 0)
                {
                    fileDtos.Add(await SaveFileEntityAsync(file, directory));
                }
            }

            return fileDtos;
        }

        // Save Images
        public async Task<List<FileResponseDto>> SaveImagesAsync(IList<IFormFile> images, string directory)
        {
            List<FileResponseDto> imageDtos = new List<FileResponseDto>();

            foreach (var image in images)
            {
                if (image.Length > 0)
                {
                    imageDtos.Add(await SaveFileEntityAsync(image, directory, isImage: true));
                }
            }

            return imageDtos;
        }

        // Update files & Images
        public async Task<FileResponseDto> UpdateFileAsync(Guid fileId, IFormFile newFile, string directory, bool isImage = false)
        {
            var fileEntity = await _context.Files.FindAsync(fileId);
            if (fileEntity == null) throw new Exception("File not found.");

            DeleteFileOrImage(fileEntity.FilePath);

            string newFilePath = await SaveFileAsync(newFile, directory, isImage);

            fileEntity.FileName = Path.GetFileName(newFilePath);
            fileEntity.FilePath = newFilePath;
            fileEntity.ContentType = newFile.ContentType;
            fileEntity.Size = newFile.Length;
            fileEntity.UpdateDate = TimeHelper.GetCurrentTimeInAbuDhabi();
            fileEntity.UpdatedById = GetCurrentUserId();

            _context.Files.Update(fileEntity);
            await _context.SaveChangesAsync();

            return _mapper.Map<FileResponseDto>(fileEntity);
        }

        // Update Image
        public async Task<FileResponseDto> UpdateImageAsync(Guid imageId, IFormFile newImage, string directory)
        {
            return await UpdateFileAsync(imageId, newImage, directory, isImage: true);
        }

        // Delete from server
        private void DeleteFileOrImage(string filePath)
        {
            if (File.Exists(filePath))
            {
                File.Delete(filePath);
            }
        }

        // Delete from server & db
        public async Task DeleteFileAsync(Guid fileId)
        {
            var fileEntity = await _context.Files.FindAsync(fileId);
            if (fileEntity == null) throw new Exception("File not found.");

            DeleteFileOrImage(fileEntity.FilePath);

            _context.Files.Remove(fileEntity);
            await _context.SaveChangesAsync();
        }

        // Delete image
        public async Task DeleteImageAsync(Guid imageId)
        {
            await DeleteFileAsync(imageId);
        }

        private string GetCurrentUserId()
        {
            return _httpContextAccessor
                .HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value
                    ?? null!;
        }
    }
}
