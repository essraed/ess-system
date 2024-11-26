using API.DTOs;
using API.Interfaces;
using API.RequestParams;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthorityController : ControllerBase
    {
        private readonly IAuthorityService _authorityService;

        public AuthorityController(IAuthorityService authorityService)
        {
            _authorityService = authorityService;
        }

        [HttpGet("getAll")]
        public async Task<IActionResult> GetAllAuthorities([FromQuery]AuthorityParams authorityParams)
        {
            return Ok(await _authorityService.GetAllAuthoritiesAsync(authorityParams));
        }

        

        [HttpGet("get-all-dropdown")]
        public async Task<IActionResult> GetAllDropdown()
        {
            return Ok(await _authorityService.GetAllDropdownAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            try
            {
                var authority = await _authorityService.GetAuthorityByIdAsync(id);
                return Ok(authority);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] AuthoritySaveDto model)
        {
            try
            {
                var authority = await _authorityService.AddAuthorityAsync(model);
                return Ok(authority);
            }
            catch (Exception ex)
            {
                return BadRequest($"An error occurred while creating the Authority: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] AuthoritySaveDto model)
        {
            try
            {
                await _authorityService.UpdateAuthorityAsync(id, model);
                return Ok("Update completed successfully");
            }
            catch (Exception ex)
            {
                return BadRequest($"An error occurred while updating the Authority: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            try
            {
                await _authorityService.DeleteAuthorityAsync(id);
                return Ok("Delete completed successfully");
            }
            catch (Exception ex)
            {
                return BadRequest($"An error occurred while deleting the Authority: {ex.Message}");
            }
        }
    }
}
