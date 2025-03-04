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


        [HttpPost]
        public async Task<IActionResult> Create([FromBody] BlogSaveDto model)
        {
            try
            {
                var blog = await _blogService.AddBlogAsync(model);
                return Ok(blog);
            }
            catch (Exception ex)
            {
                return BadRequest($"An error occurred while creating the Car: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            try
            {
                await _blogService.DeleteBlogAsync(id);
                return Ok("Delete completed successfully");
            }
            catch (Exception ex)
            {
                return BadRequest($"An error occurred while deleting the Car: {ex.Message}");
            }
        }


    }
}