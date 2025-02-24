using API.DTOs;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NationalityController : ControllerBase
    {
        private readonly INationalityService _nationalityService;

        public NationalityController(INationalityService nationalityService)
        {
            _nationalityService = nationalityService;
        }

        // GET: api/nationality
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<NationalityDto>>> GetAll()
        {
            var nationalities = await _nationalityService.GetAllAsync();
            return Ok(nationalities);
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<NationalityDto>> GetNationalityItemById(Guid id)
        {
            try
            {
                var nationality = await _nationalityService.GetNationalityItemById(id);
                return Ok(nationality);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }

    }
}
