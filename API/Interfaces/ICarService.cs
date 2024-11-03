
using API.DTOs;

namespace API.Interfaces
{
    public interface ICarService
    {
        Task<List<CarDto>> GetAllCarsAsync();
        Task<CarDto> GetCarByIdAsync(Guid id);
        Task<CarDto> AddCarAsync(CarSaveDto model);
        Task DeleteCarAsync(Guid id);
    }
}