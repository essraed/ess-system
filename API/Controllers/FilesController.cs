using API.DTOs;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class FilesController : ControllerBase
    {
        private readonly IFileService _fileService;

        public FilesController(IFileService fileService)
        {
            _fileService = fileService;
        }

        [HttpPost("uploadFile")]
        public async Task<IActionResult> UploadFiles([FromForm] FileUploadNewDto fileUploadDto)
        {
            return Ok(await _fileService.SaveFilesAsync(fileUploadDto.Files, fileUploadDto.directory));
        }

        [HttpPost("uploadImage")]
        public async Task<IActionResult> UploadImages([FromForm] FileUploadNewDto fileUploadDto)
        {
            return Ok(await _fileService.SaveImagesAsync(fileUploadDto.Files, fileUploadDto.directory));
        }

        [HttpPut("updateFile/{id}")]
        public async Task<IActionResult> UpdateFile(Guid id, [FromForm] FileUpdateDto fileUploadDto)
        {
            var result = await _fileService.UpdateFileAsync(id, fileUploadDto.File, fileUploadDto.directory);
            return Ok(result);
        }

        [HttpPut("updateImage/{id}")]
        public async Task<IActionResult> UpdateImage(Guid id, [FromForm] FileUpdateDto fileUploadDto)
        {
            var result = await _fileService.UpdateImageAsync(id, fileUploadDto.File, fileUploadDto.directory);
            return Ok(result);
        }

        [HttpDelete("deleteFile/{id}")]
        public async Task<IActionResult> DeleteFile(Guid id)
        {
            await _fileService.DeleteFileAsync(id);
            return NoContent();
        }

        [HttpDelete("deleteImage/{id}")]
        public async Task<IActionResult> DeleteImage(Guid id)
        {
            await _fileService.DeleteImageAsync(id);
            return NoContent();
        }
    }
}
