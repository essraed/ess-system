using Microsoft.AspNetCore.Mvc;
using API.DTOs;
using API.Interfaces;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using API.RequestParams;
using API.DTOs.PaymentDto;
using API.Data;
using Stripe;
using API.Migrations;
using Microsoft.EntityFrameworkCore;



[ApiController]
[Route("api/[controller]")]
public class StripeWebhookController : ControllerBase
{
    private readonly IConfiguration _config;
    private readonly DataContext _context;

    public StripeWebhookController(IConfiguration config, DataContext context)
    {
        _config = config;
        _context = context;
    }

   [HttpPost]
[AllowAnonymous]
public async Task<IActionResult> Index()
{
    var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();

    try
    {
        var stripeSignature = Request.Headers["Stripe-Signature"];
        var secret = Environment.GetEnvironmentVariable("Stripe__WebhookSecret");

        if (string.IsNullOrEmpty(stripeSignature) || string.IsNullOrEmpty(secret))
            return BadRequest(new { error = "Missing Stripe signature or secret." });

        var stripeEvent = EventUtility.ConstructEvent(json, stripeSignature, secret);

        if (stripeEvent.Type == EventTypes.PaymentIntentSucceeded)
        {
            var intent = stripeEvent.Data.Object as PaymentIntent;
            if (intent != null)
            {
                var payment = await _context.Payments.FirstOrDefaultAsync(p => p.TransactionID == intent.Id);
                if (payment != null)
                {
                    payment.Status = "Completed";
                    payment.TransactionStatus = intent.Status;
                    await _context.SaveChangesAsync();
                }
            }
        }
        else if (stripeEvent.Type == EventTypes.PaymentIntentPaymentFailed)
        {
            var intent = stripeEvent.Data.Object as PaymentIntent;
            if (intent != null)
            {
                var payment = await _context.Payments.FirstOrDefaultAsync(p => p.TransactionID == intent.Id);
                if (payment != null)
                {
                    payment.Status = "Failed";
                    payment.TransactionStatus = intent.Status;
                    await _context.SaveChangesAsync();
                }
            }
        }
        else
        {
            Console.WriteLine($"Unhandled Stripe event type: {stripeEvent.Type}");
        }

        return Ok();
    }
    catch (Exception ex)
    {
        return BadRequest(new { error = ex.Message });
    }
}

}
