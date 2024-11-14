using API.DTOs;
using API.Helpers;
using API.Interfaces;
using API.RequestParams;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly IBookingService _bookingService;

        public BookingController(IBookingService bookingService)
        {
            _bookingService = bookingService;
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<BookingDto>>> GetAllBookings([FromQuery] BookingParams bookingParams)
        {
            try
            {
                var bookings = await _bookingService.GetAllBookingsAsync(bookingParams);
                return Ok(bookings);
            }
            catch (Exception ex)
            {
                return BadRequest($"An error occurred while retrieving bookings: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BookingDto>> GetBookingById(Guid id)
        {
            try
            {
                var booking = await _bookingService.GetBookingByIdAsync(id);
                return Ok(booking);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest($"An error occurred while retrieving the booking: {ex.Message}");
            }
        }

        [HttpGet("available-slots/{date}")]
        public async Task<ActionResult<List<TimeOnly>>> GetAvailableSlotsAsync(DateOnly date)
        {
            try
            {
                var availableSlots = await _bookingService.GetAvailableSlotsAsync(date);
                return Ok(availableSlots);
            }
            catch (Exception ex)
            {
                return BadRequest($"An error occurred while retrieving available slots: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<ActionResult<BookingDto>> AddBooking([FromBody] BookingSaveDto model)
        {
            try
            {
                var booking = await _bookingService.AddBookingAsync(model);
                return CreatedAtAction(nameof(GetBookingById), new { id = booking.Id }, booking);
            }
            catch (Exception ex)
            {
                return BadRequest($"An error occurred while adding the booking: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBooking(Guid id)
        {
            try
            {
                await _bookingService.DeleteBookingAsync(id);
                return Ok("Booking deleted successfully.");
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest($"An error occurred while deleting the booking: {ex.Message}");
            }
        }

        // [HttpPut("{id}/status/in-process")]
        // public async Task<IActionResult> SetBookingStateInProcess(Guid id)
        // {
        //     try
        //     {
        //         await _bookingService.SetBookingStateInProcess(id);
        //         return Ok("Booking status set to 'In Process'.");
        //     }
        //     catch (KeyNotFoundException ex)
        //     {
        //         return NotFound(ex.Message);
        //     }
        //     catch (Exception ex)
        //     {
        //         return BadRequest($"An error occurred while updating booking status: {ex.Message}");
        //     }
        // }

        [HttpPut("{id}/status/rejected")]
        public async Task<IActionResult> SetBookingStateRejected(Guid id)
        {
            try
            {
                await _bookingService.SetBookingStateRejected(id);
                return Ok("Booking status set to 'Rejected'.");
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest($"An error occurred while updating booking status: {ex.Message}");
            }
        }

        [HttpPut("{id}/status/finished")]
        public async Task<IActionResult> SetBookingStateFinished(Guid id)
        {
            try
            {
                await _bookingService.SetBookingStateFinished(id);
                return Ok("Booking status set to 'Finished'.");
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest($"An error occurred while updating booking status: {ex.Message}");
            }
        }
    }
}
