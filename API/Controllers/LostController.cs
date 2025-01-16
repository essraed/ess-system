using System;
using System.Threading.Tasks;
using API.DTOs;
using API.DTOs.LostDto;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using API.RequestParams;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LostController : ControllerBase
    {
        private readonly ILostService _lostService;

        public LostController(ILostService lostService)
        {
            _lostService = lostService;
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<LostDto>>> GetAllLostItems([FromQuery] LostParams lostParams)
        {
            var lostItems = await _lostService.GetAllLostItemsAsync(lostParams);
            return Ok(lostItems);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<LostDto>> GetLostItemById(Guid id)
        {
            try
            {
                var lostItem = await _lostService.GetLostItemByIdAsync(id);
                return Ok(lostItem);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }

        [HttpPost]

        public async Task<ActionResult<LostDto>> AddLostItem([FromBody] LostSaveDto lostSaveDto)
        {
            try
            {
                var createdLostItem = await _lostService.AddLostItemAsync(lostSaveDto);
                return Ok(createdLostItem);
            }
            catch (Exception ex)
            {

                // Log the full exception details, including inner exception
                var errorDetails = ex.InnerException?.Message ?? ex.Message;
                return BadRequest(new { message = errorDetails });
            }
        
        }

        [HttpDelete("{id}")]

        public async Task<IActionResult> DeleteLostItem(Guid id)
        {
            try
            {
                await _lostService.DeleteLostItemAsync(id);
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

        [HttpPut("{id}/status/in-process")]
        public async Task<IActionResult> SetLostStateInProcess(Guid id)
        {
            try
            {
                await _lostService.SetLostStateInProcess(id);
                return Ok("Lost status set to 'In Process'.");
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest($"An error occurred while updating Lost status: {ex.Message}");
            }
        }

        [HttpPut("{id}/status/completed")]
        public async Task<IActionResult> SetLostStateCompleted(Guid id)
        {
            try
            {
                await _lostService.SetLostStateCompleted(id);
                return Ok("Lost status set to 'Completed'.");
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest($"An error occurred while updating Lost status: {ex.Message}");
            }
        }
    }
}
