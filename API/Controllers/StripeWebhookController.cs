using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Stripe;
using API.Data;
using Microsoft.AspNetCore.Authorization;
using API.Migrations;


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
            var secret = _config["Stripe:WebhookSecret"];

            if (string.IsNullOrEmpty(stripeSignature) || string.IsNullOrEmpty(secret))
                return BadRequest(new { error = "Missing Stripe signature or secret." });

            var stripeEvent = EventUtility.ConstructEvent(json, stripeSignature, secret);

          switch (stripeEvent.Type)
            {
                case "payment_intent.created":
                case "payment_intent.payment_failed":
                case "payment_intent.succeeded":
                    var intent = stripeEvent.Data.Object as PaymentIntent;
                    if (intent != null)
                    {
                        var payment = await _context.Payments
                            .FirstOrDefaultAsync(p => p.TransactionID == intent.Id);

                        if (payment != null)
                        {
                            payment.TransactionStatus = intent.Status;
                            payment.Status = stripeEvent.Type switch
                            {
                                "payment_intent.created" => "Created",
                                "payment_intent.payment_failed" => "Failed",
                                "payment_intent.succeeded" => "Completed",
                                _ => payment.Status
                            };

                            await _context.SaveChangesAsync();
                            Console.WriteLine($"✔️ PaymentIntent handled: {intent.Id}, status: {intent.Status}");
                        }
                        else
                        {
                            Console.WriteLine($"⚠️ Payment record not found for PaymentIntent: {intent.Id}");
                        }
                    }
                    break;

                case "charge.succeeded":
                case "charge.updated":
                    var charge = stripeEvent.Data.Object as Charge;
                    if (charge != null && charge.PaymentIntentId != null)
                    {
                        var payment = await _context.Payments
                            .FirstOrDefaultAsync(p => p.TransactionID == charge.PaymentIntentId);

                        if (payment != null)
                        {
                            payment.TransactionStatus = charge.Status;
                            payment.Status = stripeEvent.Type == "charge.succeeded" ? "ChargeSucceeded" : "ChargeUpdated";
                            await _context.SaveChangesAsync();
                            Console.WriteLine($"💳 Charge event handled: {charge.Id}, status: {charge.Status}");
                        }
                        else
                        {
                            Console.WriteLine($"⚠️ Payment record not found for Charge intent: {charge.PaymentIntentId}");
                        }
                    }
                    break;

                default:
                    Console.WriteLine($"Unhandled Stripe event type: {stripeEvent.Type}");
                    break;
            }

            return Ok();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Webhook error: {ex.Message}");
            return BadRequest(new { error = ex.Message });
        }
    }

}
