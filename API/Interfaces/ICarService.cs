
using API.DTOs;
using API.Helpers;
using API.RequestParams;

namespace API.Interfaces
{
    public interface ICarService
    {
        Task<PagedList<CarDto>> GetAllCarsAsync(CarParams carParams);
        Task<CarDto> GetCarByIdAsync(Guid id);
        Task<CarDto> AddCarAsync(CarSaveDto model);
        Task DeleteCarAsync(Guid id);
    }
}