using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Interfaces;
using API.RequestParams;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BlogController : ControllerBase
    {
        private readonly IBlogService _blogService;

        public BlogController(IBlogService blogsService)
        {
            _blogService = blogsService;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllBlogs([FromQuery] BlogParams blogParams)
        {
            return Ok(await _blogService.GetAllBlogsAsync(blogParams));
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> Get(Guid id)
        {
            try
            {
                var blogs = await _blogService.GetBlogByIdAsync(id);
                return Ok(blogs);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        // Keep only one POST method
        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult<BlogDetailsDto>> AddBlogAsync([FromBody] BlogSaveDto blogSaveDto)
        {
            try
            {
                var blog = await _blogService.AddBlogAsync(blogSaveDto);
                return Ok(blog);
            }
            catch (Exception ex)
            {
                // Log the full exception details, including inner exception
                var errorDetails = ex.InnerException?.Message ?? ex.Message;
                return BadRequest(new { message = errorDetails });
            }
        }

        [HttpPost("upload-image")]
        public async Task<IActionResult> UploadImage([FromForm] FileUploadNewDto model)
        {
            try
            {
                return Ok(await _blogService.UploadImage(model));
            }
            catch (Exception ex)
            {
                return BadRequest($"An error occurred while uploading blog image: {ex.Message}");
            }
        }
        [HttpPost("upload-image-ForPost")]
        public async Task<IActionResult> UploadImageForPost([FromForm] FileUploadNewDto model)
        {
            try
            {
                return Ok(await _blogService.UploadImageForPost(model));
            }
            catch (Exception ex)
            {
                return BadRequest($"An error occurred while uploading blog image: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBlogAsync(Guid id)
        {
            try
            {
                await _blogService.DeleteBlogAsync(id);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
