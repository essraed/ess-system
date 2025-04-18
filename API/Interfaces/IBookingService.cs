
using API.DTOs;
using API.Helpers;
using API.RequestParams;

namespace API.Interfaces
{
    public interface IBookingService
    {

        Task<BookingDto?> GetBookingByBookingCodeAsync(string bookingCode); // Allow nullability

        Task<PagedList<BookingDto>> GetAllBookingsAsync(BookingParams bookingParams);

        Task<BookingDetilasDto> GetBookingByIdAsync(Guid id);

        Task<BookingDto> AddBookingAsync(BookingSaveDto model);
        Task<List<string>> GetAvailableSlotsAsync(DateOnly date);

        Task DeleteBookingAsync(Guid id);

        Task SetBookingStateInProcess(Guid id);

        Task SetBookingStateCanceled(Guid id,CanceledReason reason);

        Task SetBookingStateCompleted(Guid id);
        Task SetBookingStatePending(Guid id);

        Task setPaymentType(Guid id,string type);

        Task SetThePaymentIdForBooking(Guid id,string IDS);

        Task<string> UploadImage(FileUploadNewDto model);
    }
}
