
using API.DTOs;
using API.Helpers;
using API.RequestParams;

namespace API.Interfaces
{
    public interface IBookingService
    {
        Task<PagedList<BookingDto>> GetAllBookingsAsync(BookingParams bookingParams);

        Task<BookingDto> GetBookingByIdAsync(Guid id);

        Task<BookingDto> AddBookingAsync(BookingSaveDto model);
        Task<List<TimeOnly>> GetAvailableSlotsAsync(DateOnly date);

        Task DeleteBookingAsync(Guid id);

        Task SetBookingStateInProcess(Guid id);

        Task SetBookingStateRejected(Guid id);
        
        Task SetBookingStateFinished(Guid id);
    }
}
