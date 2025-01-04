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

public class PaymentService : IPaymentService
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;

    public PaymentService(DataContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<string> InitiatePayment(PaymentSaveDto paymentDto)
    {
        if (paymentDto == null || paymentDto.TransactionAmount <= 0)
        {
            throw new Exception("Invalid payment details.");
        }

        var payment = _mapper.Map<Payment>(paymentDto);
        payment.MerchantId = "Demo Merchant";
        payment.TransactionHint = "CPT:Y;VCC:Y;";
        payment.Currency = "AED";
        payment.ReturnUrl = "https://kbc.center/payment/success";
        payment.CancelUrl = "https://kbc.center/payment/failed";




        var paymentRequest = new
        {
            MerchantName = payment.MerchantId,
            Amount = payment.TransactionAmount,
            Currency = payment.Currency,
            OrderId = payment.OrderId.ToString(),
            ReturnUrl = payment.ReturnUrl,
            CancelUrl = payment.CancelUrl,
            CustomerName = payment.CustomerName,
            CustomerEmail = payment.CustomerEmail,
            CustomerPhone = payment.CustomerPhone,
            UserName = "Demo_fy9c",
            Password = "Contrust@20182018",
            channel = "WEB",
        };

        var apiUrl = "https://deme-ipg.ctdev.comtrust.ae:2443";
        var httpClient = new HttpClient();
        var content = new StringContent(JsonConvert.SerializeObject(paymentRequest), Encoding.UTF8, "application/json");

        var response = await httpClient.PostAsync(apiUrl, content);
        if (!response.IsSuccessStatusCode)
        {
            throw new Exception("Failed to initiate payment with Etisalat.");
        }

        var paymentResponse = await response.Content.ReadAsStringAsync();
        dynamic result = JsonConvert.DeserializeObject(paymentResponse);

        string paymentUrl = result?.PaymentUrl?.ToString();

        if (!string.IsNullOrEmpty(paymentUrl))
        {
            payment.Status = "Pending";
            payment.CreateDate = DateTime.UtcNow;

            _context.Payments.Add(payment);
            await _context.SaveChangesAsync();
        }
        else
        {
            throw new Exception("Payment URL is missing from the response.");
        }

        return paymentUrl;
    }

    public async Task PaymentCallback(string orderId, string paymentStatus)
    {
        try
        {
            var payment = await _context.Payments.FirstOrDefaultAsync(p => p.OrderId.ToString() == orderId);

            if (payment == null)
            {
                throw new Exception("Payment not found.");
            }

            if (paymentStatus == "SUCCESS")
            {
                payment.Status = "Completed";
            }
            else
            {
                payment.Status = "Failed";
            }

            await _context.SaveChangesAsync();

        }
        catch (Exception ex)
        {
            throw new Exception($"An error occurred: {ex.Message}");
        }
    }


    // public async Task<PagedList<PaymentDto>> GetAllPaymentsAsync(PaymentParams paymentParams)
    // {
    //     var query = _context.Payments
    //         .Where(x => !x.IsDeleted)
    //         .Include(x => x.Booking)
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


    // public async Task<ServiceDto> GetServiceByIdAsync(Guid id)
    // {
    //     var service = await _context.Services
    //         .Include(x => x.CreatedBy)
    //         .Include(x => x.UpdatedBy)
    //         .Include(x => x.ServiceOptions)
    //         .Include(x => x.Category)
    //         .Include(x => x.FileEntity)
    //         .FirstOrDefaultAsync(x => x.Id == id);

    //     if (service == null)
    //     {
    //         throw new KeyNotFoundException($"Service with id {id} not found.");
    //     }

    //     return _mapper.Map<ServiceDto>(service);
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
