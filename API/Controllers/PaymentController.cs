using Microsoft.AspNetCore.Mvc;
using API.DTOs;
using API.Interfaces;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using API.RequestParams;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentController : ControllerBase
    {
        private readonly IPaymentService _paymentService;

        public PaymentController(IPaymentService paymentService)
        {
            _paymentService = paymentService;
        }

        [HttpPost("initiate-payment")]
        [AllowAnonymous]
        public async Task<IActionResult> InitiatePayment([FromForm] PaymentSaveDto paymentDto)
        {
            try
            {
                string paymentUrl = await _paymentService.InitiatePayment(paymentDto);
                return Ok(paymentUrl);
            }
            catch (Exception ex)
            {
                return BadRequest($"An error occurred: {ex.Message}");
            }
        }


        [HttpPost("payment-callback")]
        public async Task<IActionResult> PaymentCallback([FromForm] string orderId, [FromForm] string paymentStatus)
        {
            try
            {
                await _paymentService.PaymentCallback(orderId, paymentStatus);
                return Ok("Payment Done successfully");
            }
            catch (Exception ex)
            {
                return BadRequest($"An error occurred: {ex.Message}");
            }
        }


        // [HttpGet("getAll")]
        // [AllowAnonymous]
        // public async Task<IActionResult> GetAllPayments([FromQuery] PaymentParams paymentParams)
        // {
        //     return Ok(await _paymentService.GetAllPaymentsAsync(paymentParams));
        // }

        // [HttpGet("{id}")]
        // [AllowAnonymous]
        // public async Task<IActionResult> Get(Guid id)
        // {
        //     try
        //     {
        //         var service = await _paymentService.GetServiceByIdAsync(id);
        //         return Ok(service);
        //     }
        //     catch (KeyNotFoundException ex)
        //     {
        //         return NotFound(ex.Message);
        //     }
        // }


        // [HttpDelete("{id}")]
        // public async Task<IActionResult> Delete(Guid id)
        // {
        //     try
        //     {
        //         await _serviceService.DeleteServiceAsync(id);
        //         return Ok("Delete completed successfully");
        //     }
        //     catch (Exception ex)
        //     {
        //         return BadRequest($"An error occurred while deleting the Service: {ex.Message}");
        //     }
        // }






    }
}
