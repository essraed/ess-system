using System.Threading.Tasks;
using API.DTOs;
using API.DTOs.PaymentDto;
using API.Helpers;
using API.RequestParams;
using Microsoft.AspNetCore.Mvc;

namespace API.Interfaces
{
    public interface IPaymentService
    {
        Task<string> InitiatePayment(PaymentSaveDto paymentDto, string IDS);

        Task<string> PaymentCallback(PaymentCallbackDto callback);
        Task<string> CreatePaymentIntentAsync(CreatePaymentIntentDto dto);

        // Task<PagedList<PaymentDto>> GetAllPaymentsAsync(PaymentParams paymentParams);
        // Task<PaymentDto> GetPaymentByIdAsync(Guid id);

        // Task<ServiceDto> GetServiceByIdAsync(Guid id)
    }
}
