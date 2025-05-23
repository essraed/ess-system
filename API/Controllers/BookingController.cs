using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using API.RequestParams;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly IBookingService _bookingService;
        private readonly IGenericService<Service> _genericService;

        public BookingController(IBookingService bookingService, IGenericService<Service> genericService)
        {
            _genericService = genericService;
            _bookingService = bookingService;
        }


[HttpGet("TrackOrder/{bookingCode}")]
[AllowAnonymous]
public async Task<ActionResult<BookingDto>> TrackOrderByBookingCode(string bookingCode)
{
    try
    {
        var booking = await _bookingService.GetBookingByBookingCodeAsync(bookingCode);
        
        if (booking == null)
        {
            return NotFound($"Booking with BookingCode '{bookingCode}' not found.");
        }

        return Ok(booking);
    }
    catch (Exception ex)
    {
        return BadRequest($"An error occurred while retrieving the order status: {ex.Message}");
    }
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

        [HttpGet("get-all-dropdown")]
        public async Task<IActionResult> GetAllDropdown()
        {
            return Ok(await _genericService.GetAllDropdownAsync());
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<BookingDetilasDto>> GetBookingById(Guid id)
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
        [AllowAnonymous]
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
        [AllowAnonymous]
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

        [HttpPut("{id}/setPaymentType")]
        [AllowAnonymous]
        public async Task<IActionResult> setPaymentType(Guid id, [FromBody] PaymentType paymentType)
        {
            try
            {
                await _bookingService.setPaymentType(id, paymentType.Type);
                return Ok($"Booking Payment Type  set to {paymentType.Type} ");
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest($"An error occurred while updating booking Payment Type : {ex.Message}");
            }
        }


        [HttpPut("{id}/status/in-process")]
        public async Task<IActionResult> SetBookingStateInProcess(Guid id)
        {
            try
            {
                await _bookingService.SetBookingStateInProcess(id);
                return Ok("Booking status set to 'In Process'.");
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

        [HttpPut("{id}/status/canceled")]
        [AllowAnonymous]
        public async Task<IActionResult> SetBookingStateCanceled(Guid id,CanceledReason reason)
        {
            try
            {
                await _bookingService.SetBookingStateCanceled(id,reason);
                return Ok("Booking status set to 'Canceled'.");
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

        [HttpPut("{id}/status/completed")]
        public async Task<IActionResult> SetBookingStateCompleted(Guid id)
        {
            try
            {
                await _bookingService.SetBookingStateCompleted(id);
                return Ok("Booking status set to 'Completed'.");
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

        [HttpPut("{id}/status/pending")]
        public async Task<IActionResult> SetBookingStatePending(Guid id)
        {
            try
            {
                await _bookingService.SetBookingStatePending(id);
                return Ok("Booking status set to 'Pending'.");
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


        [HttpPost("upload-image")]
        [AllowAnonymous]
        public async Task<IActionResult> UploadImage([FromForm] FileUploadNewDto model)
        {
            try
            {
                return Ok(await _bookingService.UploadImage(model));
            }
            catch (Exception ex)
            {
                return BadRequest($"An error occurred while uploading Document: {ex.Message}");
            }
        }
    }
}
