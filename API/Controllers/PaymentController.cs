using Microsoft.AspNetCore.Mvc;
using API.DTOs;
using API.Interfaces;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using API.RequestParams;
using API.DTOs.PaymentDto;

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
        public async Task<IActionResult> InitiatePayment([FromForm] PaymentSaveDto paymentDto, [FromForm] string IDS)
        {
            try
            {
                string paymentUrl = await _paymentService.InitiatePayment(paymentDto, IDS);
                return Ok(paymentUrl);
            }
            catch (Exception ex)
            {
                return BadRequest($"An error occurred: {ex.Message}");
            }
        }


        [HttpPost("payment-callback")]
        [AllowAnonymous]
        public async Task<IActionResult> PaymentCallback()
        {
            try
            {
                var form = await Request.ReadFormAsync();

                var transaction = new Transaction
                {
                    TransactionID = form["TransactionID"]
                };

                var callback = new PaymentCallbackDto
                {
                    Transaction = transaction
                };

                var status = await _paymentService.PaymentCallback(callback);
                return Redirect($"https://kbc.center/payment/status?{status}");
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest($"Invalid request: {ex.Message}");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An unexpected error occurred: {ex.Message}");
            }
        }




        [HttpPost("create-payment-intent")]
        [AllowAnonymous]
        public async Task<IActionResult> CreatePaymentIntent([FromBody] CreatePaymentIntentDto dto)
        {
            try
            {
                var clientSecret = await _paymentService.CreatePaymentIntentAsync(dto);
                return Ok(new { clientSecret });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }
        // [HttpPost("google-pay")]
        // public async Task<IActionResult> ProcessGooglePay([FromBody] GooglePayPaymentRequest paymentRequest)
        // {
        //     try
        //     {
        //         // Call the payment service to process the Google Pay payment
        //         var result = await _paymentService.ProcessGooglePayPaymentAsync(paymentRequest);

        //         if (result == "success")
        //         {
        //             return Ok(new { status = "success" });
        //         }

        //         return BadRequest(new { status = "failed", message = "Payment failed." });
        //     }
        //     catch (Exception ex)
        //     {
        //         return StatusCode(500, new { status = "error", message = ex.Message });
        //     }
        // }


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
        //         var payment = await _paymentService.GetPaymentByIdAsync(id);
        //         return Ok(payment);
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
