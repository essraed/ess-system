using API.DTOs;
using API.Entities;
using API.Interfaces;
using API.RequestParams;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TestimonialController : ControllerBase
    {
        private readonly ITestimonialService _testimonialService;

        public TestimonialController(ITestimonialService testimonialService)
        {
            _testimonialService = testimonialService;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllTestimonials([FromQuery] TestimonialParams testimonialParams)
        {
            return Ok(await _testimonialService.GetAllTestimonialsAsync(testimonialParams));
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> AddTestimonialAsync([FromBody] TestimonialSaveDto testimonialDto)
        {
            try
            {
                var testimonial = await _testimonialService.AddTestimonialAsync(testimonialDto);
                return Ok(testimonial);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.InnerException?.Message ?? ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTestimonialAsync(Guid id)
        {
            try
            {
                await _testimonialService.DeleteTestimonialAsync(id);
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
