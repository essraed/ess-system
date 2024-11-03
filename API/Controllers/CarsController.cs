using API.DTOs;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class CarsController : ControllerBase
    {
        private readonly ICarService _carsService;

        public CarsController(ICarService carsService)
        {
            _carsService = carsService;
        }

        [HttpGet("getAll")]
        public async Task<IActionResult> GetAllAuthorities()
        {
            return Ok(await _carsService.GetAllCarsAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            try
            {
                var cars = await _carsService.GetCarByIdAsync(id);
                return Ok(cars);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CarSaveDto model)
        {
            try
            {
                var cars = await _carsService.AddCarAsync(model);
                return Ok(cars);
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
                await _carsService.DeleteCarAsync(id);
                return Ok("Delete completed successfully");
            }
            catch (Exception ex)
            {
                return BadRequest($"An error occurred while deleting the Car: {ex.Message}");
            }
        }
    }
}
