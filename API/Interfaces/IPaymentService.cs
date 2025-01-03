using System.Threading.Tasks;
using API.DTOs;
using API.Helpers;
using API.RequestParams;
using Microsoft.AspNetCore.Mvc;

namespace API.Interfaces
{
    public interface IPaymentService
    {
        Task<string> InitiatePayment(PaymentSaveDto paymentDto);
        Task PaymentCallback( string orderId,  string paymentStatus);

        // Task<PagedList<PaymentDto>> GetAllPaymentsAsync(PaymentParams paymentParams);
        // Task DeleteServiceAsync(Guid id);

        // Task<ServiceDto> GetServiceByIdAsync(Guid id)
    }
}
