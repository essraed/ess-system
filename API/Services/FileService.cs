using System.Security.Claims;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;
using SixLabors.ImageSharp.Formats.Jpeg;

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
        // Save files & images into server
        public async Task<string> SaveFileAsync(IFormFile file, string directory, bool isImage = false, string? bookingCode = null)
        {
            string uploadPath = Path.Combine(_environment.WebRootPath, directory);

            if (!Directory.Exists(uploadPath))
            {
                Directory.CreateDirectory(uploadPath);
            }

            string uniqueFileName;

            if (!string.IsNullOrEmpty(bookingCode))
            {
                uniqueFileName = $"{bookingCode}_{DateTime.UtcNow:yyyyMMddHHmmssfff}{Path.GetExtension(file.FileName)}";
            }
            else
            {
                uniqueFileName = $"{Guid.NewGuid()}_{file.FileName}";
            }


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

        public async Task<FileEntity> GetFileByIdAsync(Guid id)
        {
            if (id == Guid.Empty) throw new Exception($"File with id {id} not found.");
            return await _context.FileEntities.FindAsync(id) ?? null!;
        }

        // Save files & Images into server & db.
        public async Task<FileResponseDto> SaveFileEntityAsync(IFormFile file, string directory, bool isImage = false, string? bookingCode = null)
        {
            const long maxFileSize = 10 * 1024 * 1024;
            string filePath;

            if (file.Length > maxFileSize)
            {
                if (isImage)
                {
                    // Compress the image
                    filePath = await CompressAndSaveImageAsync(file, directory, bookingCode);
                }
                else
                {
                    throw new Exception("File size exceeds the allowed limit of 10MB for non-image files.");
                }
            }
            else
            {
                filePath = await SaveFileAsync(file, directory, isImage, bookingCode);
            }
            var fileEntity = new FileEntity
            {
                FileName = Path.GetFileName(filePath),
                FilePath = filePath,
                ContentType = file.ContentType,
                Size = file.Length,
                CreateDate = TimeHelper.GetCurrentTimeInAbuDhabi(),
                CreatedById = GetCurrentUserId(),
            };

            _context.FileEntities.Add(fileEntity);
            await _context.SaveChangesAsync();

            return _mapper.Map<FileResponseDto>(fileEntity);
        }

        // Save multiple files
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
            var fileEntity = await _context.FileEntities.FindAsync(fileId);
            if (fileEntity == null) throw new Exception("File not found.");

            DeleteFileOrImage(fileEntity.FilePath);

            const long maxFileSize = 20 * 1024 * 1024;
            string filePath;

            if (newFile.Length > maxFileSize)
            {
                if (isImage)
                {
                    filePath = await CompressAndSaveImageAsync(newFile, directory);
                }
                else
                {
                    throw new Exception("File size exceeds the allowed limit of 20MB for non-image files.");
                }
            }
            else
            {
                filePath = await SaveFileAsync(newFile, directory, isImage);
            }

            fileEntity.FileName = Path.GetFileName(filePath);
            fileEntity.FilePath = filePath;
            fileEntity.ContentType = newFile.ContentType;
            fileEntity.Size = newFile.Length;
            fileEntity.UpdateDate = TimeHelper.GetCurrentTimeInAbuDhabi();
            fileEntity.UpdatedById = GetCurrentUserId();

            _context.FileEntities.Update(fileEntity);
            await _context.SaveChangesAsync();

            return _mapper.Map<FileResponseDto>(fileEntity);
        }

        // Update Images
        public async Task<List<FileResponseDto>> UpdateImageAsync(Guid imageId, IList<IFormFile> newImages, string directory)
        {
            List<FileResponseDto> imageDtos = new List<FileResponseDto>();

            foreach (var image in newImages)
            {
                if (image.Length > 0)
                {
                    imageDtos.Add(await UpdateFileAsync(imageId, image, directory, isImage: true));
                }
            }

            return imageDtos;
        }

        // Delete from server
        public void DeleteFileOrImage(string filePath)
        {
            var path = Path.Combine(_environment.WebRootPath, filePath);
            if (File.Exists(path))
            {
                File.Delete(path);
            }
        }

        // Delete from server & db
        public async Task DeleteFileAsync(Guid fileId)
        {
            var fileEntity = await _context.FileEntities.FindAsync(fileId);
            if (fileEntity == null) throw new Exception("File not found.");

            DeleteFileOrImage(fileEntity.FilePath);

            _context.FileEntities.Remove(fileEntity);
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


        private async Task<string> CompressAndSaveImageAsync(IFormFile file, string directory, string? bookingCode = null)
        {
            string uploadPath = Path.Combine(_environment.WebRootPath, directory);
            if (!Directory.Exists(uploadPath))
            {
                Directory.CreateDirectory(uploadPath);
            }

            string uniqueFileName;
            if (!string.IsNullOrEmpty(bookingCode))
            {
                uniqueFileName = $"{bookingCode}_{DateTime.UtcNow:yyyyMMddHHmmssfff}{Path.GetExtension(file.FileName)}";
            }
            else
            {
                uniqueFileName = $"{Guid.NewGuid()}_{file.FileName}";
            }
            string filePath = Path.Combine(uploadPath, uniqueFileName);

            using (var stream = file.OpenReadStream())
            using (var image = await Image.LoadAsync(stream))
            {
                image.Mutate(x => x.Resize(new ResizeOptions
                {
                    Mode = ResizeMode.Max,
                    Size = new Size(1920, 1080)
                }));

                var quality = 75;
                await SaveImageAsync(image, filePath, quality);

                var fileInfo = new FileInfo(filePath);
                while (fileInfo.Length > 10 * 1024 * 1024)
                {
                    quality -= 5;
                    if (quality <= 10) break;
                    await SaveImageAsync(image, filePath, quality);
                    fileInfo = new FileInfo(filePath);
                }
            }

            return Path.Combine(directory, uniqueFileName); // Return the relative path of the compressed image
        }

        private async Task SaveImageAsync(Image image, string filePath, int quality)
        {
            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                var jpegEncoder = new JpegEncoder { Quality = quality };
                await image.SaveAsync(fileStream, jpegEncoder);
            }
        }




    }
}
