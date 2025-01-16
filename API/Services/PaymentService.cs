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

public class PaymentService : IPaymentService
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;



    public PaymentService(DataContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<string> InitiatePayment(PaymentSaveDto paymentDto, string IDS)
    {
        if (paymentDto == null || paymentDto.TransactionAmount <= 0)
        {
            throw new Exception("Invalid payment details.");
        }

        var payment = _mapper.Map<Payment>(paymentDto);
        payment.MerchantId = "Demo Merchant";
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
                UserName = "Demo_fY9c",
                Password = "Comtrust@20182018"
            }
        };

        var apiUrl = "https://demo-ipg.ctdev.comtrust.ae:2443/";

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

            var bookingIds = IDS.Split(',').Select(Guid.Parse).ToList(); // Assuming IDS is a comma-separated string of GUIDs
            var bookingsToUpdate = await _context.Bookings
                .Where(b => bookingIds.Contains(b.Id))
                .ToListAsync();

            foreach (var booking in bookingsToUpdate)
            {
                booking.PaymentId = payment.Id;
            }

            await _context.SaveChangesAsync();
        }
        else
        {
            throw new Exception($"Payment URL is missing from the response. Content: {responseContent}");
        }

        return paymentUrl;
    }


    public async Task PaymentCallback(PaymentCallbackDto callback)
    {
        try
        {

            var payment = await _context.Payments.FirstOrDefaultAsync(p => p.TransactionID == callback.Transaction.TransactionID);
            if (payment == null)
            {
                throw new Exception("Invalid Transaction ID");
            }

            if (callback.Transaction.ResponseCode == "0") // Success
            {
                payment.Status = "Completed";
                payment.TransactionStatus = "Success";
                payment.CreateDate = DateTime.UtcNow;
                _context.Payments.Update(payment);
                await _context.SaveChangesAsync();
                return;
            }
            else if (callback.Transaction.ResponseCode == "51" || callback.Transaction.ResponseCode == "91") // Pending
            {
                payment.Status = "Pending";
                _context.Payments.Update(payment);
                await _context.SaveChangesAsync();
                return;
            }
            else // Failure
            {
                payment.Status = "Failed";
                payment.TransactionStatus = callback.Transaction.ResponseDescription;
                _context.Payments.Update(payment);
                await _context.SaveChangesAsync();
                return;
            }

        }
        catch (Exception ex)
        {
            throw new Exception($"An error occurred: {ex.Message}");
        }
    }


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
