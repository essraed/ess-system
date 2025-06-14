using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

using System.Security.Cryptography.X509Certificates;
using API.RequestParams;
using API.Helpers;
using AutoMapper.QueryableExtensions;
using System.Net.Http.Headers;
using API.DTOs.PaymentDto;
using System.ComponentModel;
using Stripe;


public class PaymentService : IPaymentService
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;

    private readonly IEmailService _email;

    private readonly IBookingService _booking;
    private readonly string _stripeSecretKey;

    public PaymentService(DataContext context, IMapper mapper, IEmailService email, IBookingService bookingService)
    {
        _context = context;
        _mapper = mapper;
        _email = email;
        _booking = bookingService;
    }

    public async Task<string> InitiatePayment(PaymentSaveDto paymentDto, string IDS)
    {
        if (paymentDto == null || paymentDto.TransactionAmount <= 0)
        {
            throw new Exception("Invalid payment details.");
        }

        var payment = _mapper.Map<Payment>(paymentDto);
        payment.MerchantId = "EMIRATESSECRETARIAL";
        payment.TransactionHint = "CPT:Y;VCC:Y;";
        payment.Currency = "AED";
        payment.OrderID = Guid.NewGuid().ToString("N").Substring(0, 16);

        var paymentRequest = new
        {
            Registration = new
            {
                Customer = payment.MerchantId,
                Channel = "Web",
                Amount = payment.TransactionAmount,
                Currency = payment.Currency,
                OrderID = payment.OrderID,
                OrderName = !string.IsNullOrEmpty(payment.OrderName) && payment.OrderName.Length > 20
                ? payment.OrderName.Substring(0, 20)
                : payment.OrderName,
                TransactionHint = payment.TransactionHint,
                ReturnPath = "https://kbc.center/api/payment/payment-callback",
                UserName = "EMIRATES_HANI",
                Password = "P@s$w0rD@Dubai2025"
            }
        };

        var apiUrl = "https://ipg.comtrust.ae:2443/";

        using var httpClient = new HttpClient();

        var jsonPayload = JsonConvert.SerializeObject(paymentRequest);

        var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");

        var request = new HttpRequestMessage(HttpMethod.Post, apiUrl)
        {
            Content = content
        };

        request.Headers.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));

        var response = await httpClient.SendAsync(request);

        var responseContent = await response.Content.ReadAsStringAsync();

        if (!response.IsSuccessStatusCode)
        {
            throw new Exception($"Failed to initiate payment with Etisalat. Status Code: {response.StatusCode}, Reason: {response.ReasonPhrase}, Content: {responseContent}");
        }

        dynamic result = JsonConvert.DeserializeObject(responseContent);
        string paymentUrl = result?.Transaction?.PaymentPortal?.ToString();


        if (!string.IsNullOrEmpty(paymentUrl))
        {
            payment.Status = "Pending";
            payment.CreateDate = TimeHelper.GetCurrentTimeInAbuDhabi();
            payment.TransactionID = result?.Transaction?.TransactionID.ToString();

            _context.Payments.Add(payment);
            await _context.SaveChangesAsync();

            // this it should be in the booking servicedepend on single Responsible principle     
            await _booking.SetThePaymentIdForBooking(payment.Id, IDS);
        }
        else
        {
            throw new Exception($"Payment URL is missing from the response. Content: {responseContent}");

        }

        return paymentUrl;
    }


    public async Task<string> PaymentCallback(PaymentCallbackDto callback)
    {
        try
        {
            var finalizationRequest = new FinalizationRequest
            {
                Finalization = new Finalization
                {
                    Customer = "EMIRATESSECRETARIAL",
                    TransactionID = callback?.Transaction?.TransactionID ?? "",
                    UserName = "EMIRATES_HANI",
                    Password = "P@s$w0rD@Dubai2025"
                }
            };

            var apiUrl = "https://ipg.comtrust.ae:2443/";

            using var httpClient = new HttpClient();

            var jsonPayload = JsonConvert.SerializeObject(finalizationRequest);

            var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");

            var request = new HttpRequestMessage(HttpMethod.Post, apiUrl)
            {
                Content = content
            };

            request.Headers.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));

            var response = await httpClient.SendAsync(request);

            // Ensure the response is successful
            response.EnsureSuccessStatusCode();

            // Deserialize the response into PaymentCallbackDto
            var responseContent = await response.Content.ReadAsStringAsync();
            var paymentCallbackResponse = JsonConvert.DeserializeObject<PaymentCallbackDto>(responseContent);

            // Retrieve the payment record based on the TransactionID
            var payment = await _context.Payments.Include(x => x.Bookings).FirstOrDefaultAsync(p => p.TransactionID == callback!.Transaction!.TransactionID);
            if (payment == null)
            {
                throw new Exception("Invalid Transaction ID");
            }

            var firstBooking = payment?.Bookings?.FirstOrDefault();
            string toEmail = firstBooking!.Email;
            string subject = "";
            string message = "";

            // Handle the callback response based on the ResponseCode
            if (paymentCallbackResponse?.Transaction?.ResponseCode == "0")
            {
                payment!.Status = "Completed";
                payment.TransactionStatus = "Success";
                subject = "Payment Successful - Booking Confirmation";
                message = $@"
                        <h1>Payment Successful</h1>
                        <p>Dear {firstBooking?.CustomerName},</p>
                        <p>Your payment has been successfully processed.Here are the details of your transaction:</p>
                        <ul>
                            <li><strong>Transaction ID:</strong> {payment.TransactionID}</li>
                            <li><strong>Status:</strong> {payment.Status}</li>
                        </ul>
                        <p>Thank you for choosing us!</p>
            ";
            }
            else if (paymentCallbackResponse?.Transaction?.ResponseCode == "51" || paymentCallbackResponse?.Transaction?.ResponseCode == "91") // Pending
            {
                payment!.Status = "Pending";
                subject = "Payment Pending - Booking Update";
                message = $@"
                        <h1>Payment Pending</h1>
                        <p>Dear {firstBooking?.CustomerName},</p>
                        <p>Your payment is currently pending. Please wait while we process your transaction. Here are the details:</p>
                        <ul>
                            <li><strong>Transaction ID:</strong> {payment.TransactionID}</li>
                            <li><strong>Status:</strong> {payment.Status}</li>
                        </ul>
                        <p>If you have any questions, feel free to contact us.</p>
            ";
            }
            else // Failure
            {
                payment!.Status = "Failed";
                payment.TransactionStatus = paymentCallbackResponse?.Transaction?.ResponseDescription;
                subject = "Payment Failed - Booking Update";
                message = $@"
                        <h1>Payment Failed</h1>
                        <p>Dear {firstBooking?.CustomerName},</p>
                        <p>We regret to inform you that your payment could not be processed. Here are the details:</p>
                        <ul>
                            <li><strong>Transaction ID:</strong> {payment.TransactionID}</li>
                            <li><strong>Status:</strong> {payment.Status}</li>
                            <li><strong>Reason:</strong> {payment.TransactionStatus}</li>
                        </ul>
                        <p>Please try again or contact us for assistance.</p>
            ";
            }

            if (!string.IsNullOrEmpty(toEmail) && !string.IsNullOrEmpty(subject) && !string.IsNullOrEmpty(message))
            {
                await _email.SendEmailAsync(toEmail, subject, message);
            }

            _context.Payments.Update(payment);
            await _context.SaveChangesAsync();

            return $"status={payment.Status}&TransactionID={payment.TransactionID}";
        }
        catch (Exception ex)
        {
            throw new Exception($"An error occurred: {ex.Message}");
        }
    }

    public async Task<string> CreatePaymentIntentAsync(CreatePaymentIntentDto dto)
    {
        var options = new PaymentIntentCreateOptions
        {
            Amount = dto.Amount,
            Currency = dto.Currency ?? "usd",
            AutomaticPaymentMethods = new PaymentIntentAutomaticPaymentMethodsOptions
            {
                Enabled = true,
            },
            Metadata = new Dictionary<string, string>
            {
                { "OrderID", dto.OrderID ?? "" },
                { "OrderName", dto.OrderName ?? "" }
            }
        };

        var service = new PaymentIntentService();
        var intent = await service.CreateAsync(options);

        var payment = new Payment
        {
            Id = Guid.NewGuid(),
            TransactionAmount = (decimal)dto.Amount / 100m,
            Currency = dto.Currency,
            TransactionID = intent.Id,
            TransactionStatus = intent.Status,
            Status = "Pending",
            OrderID = dto.OrderID,
            OrderName = dto.OrderName,
            CreateDate = DateTime.UtcNow
        };

        _context.Payments.Add(payment);
        await _context.SaveChangesAsync();

        return intent.ClientSecret;
    }

    // public async Task<PaymentResult> ProcessGooglePayPayment(GooglePayPaymentData paymentData)
    // {
    //     // Example of interacting with Google's payment API to verify the transaction
    //     var client = _httpClientFactory.CreateClient();
    //     var response = await client.PostAsJsonAsync("https://payment-gateway.com/google-pay", paymentData);

    //     if (response.IsSuccessStatusCode)
    //     {
    //         var paymentResult = await response.Content.ReadAsAsync<PaymentResult>();
    //         return paymentResult;
    //     }
    //     else
    //     {
    //         throw new Exception("Failed to process Google Pay payment");
    //     }
    // }


    // public async Task<PagedList<PaymentDto>> GetAllPaymentsAsync(PaymentParams paymentParams)
    // {
    //     var query = _context.Payments
    //         .Include(x => x.Bookings)
    //         .AsNoTracking()
    //         .AsQueryable();


    //     if (!string.IsNullOrEmpty(paymentParams.SearchTerm))
    //     {
    //         query = query.Where(x => x.OrderName.Contains(paymentParams.SearchTerm));
    //     }

    //     if (paymentParams.From != null)
    //     {
    //         query = query.Where(x => x.CreateDate >= paymentParams.From);
    //     }

    //     if (paymentParams.To != null)
    //     {
    //         var toDate = paymentParams.To.Value.AddDays(1);
    //         query = query.Where(x => x.CreateDate <= toDate);
    //     }

    //     return await PagedList<PaymentDto>.CreateAsync(
    //         query.ProjectTo<PaymentDto>(_mapper.ConfigurationProvider),
    //         paymentParams.PageNumber,
    //         paymentParams.PageSize);
    // }


    // public async Task<PaymentDto> GetPaymentByIdAsync(Guid id)
    // {
    //     var payment = await _context.Payments
    //         .Include(x => x.Bookings)
    //         .FirstOrDefaultAsync(x => x.Id == id);

    //     if (payment == null)
    //     {
    //         throw new KeyNotFoundException($"payment with id {id} not found.");
    //     }

    //     return _mapper.Map<PaymentDto>(payment);
    // }

    // public async Task DeleteServiceAsync(Guid id)
    // {
    //     var service = await _context.Services.FindAsync(id);

    //     if (service == null)
    //     {
    //         throw new KeyNotFoundException($"Service with id {id} not found.");
    //     }

    //     service.IsDeleted = true;

    //     var result = await _context.SaveChangesAsync() > 0;

    //     if (!result)
    //     {
    //         throw new Exception("Failed to delete the Service.");
    //     }
    // }

}