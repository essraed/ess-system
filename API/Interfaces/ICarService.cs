
using API.DTOs;
using API.Helpers;

namespace API.Interfaces
{
    public interface ICarService
    {
        Task<List<CarDto>> GetAllCarsAsync();
        Task<CarDto> GetCarByIdAsync(Guid id);
        Task<CarDto> AddCarAsync(CarSaveDto model);
        Task<bool> CreateBooking(BookingSaveDto model);
        Task DeleteCarAsync(Guid id);
    }
}