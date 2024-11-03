using API.DTOs.ServiceDto;
using API.Interfaces;
using API.RequestParams;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class ServicesController : ControllerBase
    {
        private readonly IServiceService _serviceService;

        public ServicesController(IServiceService serviceService)
        {
            _serviceService = serviceService;
        }

        [HttpGet("getAll")]
        public async Task<IActionResult> GetAllServices([FromQuery]ServiceParams serviceParams)
        {
            return Ok(await _serviceService.GetAllServicesAsync(serviceParams));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            try
            {
                var service = await _serviceService.GetServiceByIdAsync(id);
                return Ok(service);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPost("{categoryId}")]
        public async Task<IActionResult> Create(Guid categoryId, ServiceSaveDto model)
        {
            try
            {
                var service = await _serviceService.AddServiceAsync(categoryId, model);
                return Ok(service);
            }
            catch (Exception ex)
            {
                return BadRequest($"An error occurred while creating the Service: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] ServiceSaveDto model)
        {
            try
            {
                await _serviceService.UpdateServiceAsync(id, model);
                return Ok("Update completed successfully");
            }
            catch (Exception ex)
            {
                return BadRequest($"An error occurred while updating the Service: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            try
            {
                await _serviceService.DeleteServiceAsync(id);
                return Ok("Delete completed successfully");
            }
            catch (Exception ex)
            {
                return BadRequest($"An error occurred while deleting the Service: {ex.Message}");
            }
        }
    }
}
