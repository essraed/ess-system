using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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


    }
}