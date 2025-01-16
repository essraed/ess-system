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
    public class ComplaintController : ControllerBase
    {
        private readonly ICompalintService _complaintService;

        public ComplaintController(ICompalintService complaintService)
        {
            _complaintService = complaintService;
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<ComplaintDto>>> GetAllComplaintItems([FromQuery] ComplaintParams complaintParams)
        {
            var complaintItems = await _complaintService.GetAllComplaintItemsAsync(complaintParams);
            return Ok(complaintItems);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ComplaintDto>> GetComplaintItemById(Guid id)
        {
            try
            {
                var complaintItem = await _complaintService.GetComplaintItemByIdAsync(id);
                return Ok(complaintItem);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }

        [HttpPost]

        public async Task<ActionResult<ComplaintDto>> AddComplaintItem([FromBody] ComplaintSaveDto complaintSaveDto)
        {
            try
            {
                var createdComplaintItem = await _complaintService.AddComplaintItemAsync(complaintSaveDto);
                return Ok(createdComplaintItem);
            }
            catch (Exception ex)
            {

                // Log the full exception details, including inner exception
                var errorDetails = ex.InnerException?.Message ?? ex.Message;
                return BadRequest(new { message = errorDetails });
            }
        
        }

        [HttpDelete("{id}")]

        public async Task<IActionResult> DeleteComplaintItem(Guid id)
        {
            try
            {
                await _complaintService.DeleteComplaintItemAsync(id);
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
        public async Task<IActionResult> SetComplaintStateInProcess(Guid id)
        {
            try
            {
                await _complaintService.SetComplaintStateInProcess(id);
                return Ok("Complaint status set to 'In Process'.");
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest($"An error occurred while updating Complaint status: {ex.Message}");
            }
        }

        [HttpPut("{id}/status/completed")]
        public async Task<IActionResult> SetComplaintStateCompleted(Guid id)
        {
            try
            {
                await _complaintService.SetComplaintStateCompleted(id);
                return Ok("Booking status set to 'Completed'.");
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest($"An error occurred while updating Complaint status: {ex.Message}");
            }
        }
    }
}
