using System.Security.Claims;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

public class CarService : ICarService
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;
    private readonly IHttpContextAccessor _httpContextAccessor;


    public CarService(DataContext context, IMapper mapper,
        IHttpContextAccessor httpContextAccessor)
    {
        _context = context;
        _mapper = mapper;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task<List<CarDto>> GetAllCarsAsync()
    {
        return _mapper.Map<List<CarDto>>(await _context.Cars.Include(x => x.CreatedBy).ToListAsync());
    }


    public async Task<CarDto> GetCarByIdAsync(Guid id)
    {
        var car = await _context.Cars.FindAsync(id);
        if (car == null)
        {
            throw new KeyNotFoundException($"Car with id {id} not found.");
        }
        return _mapper.Map<CarDto>(car);
    }

    public async Task<CarDto> AddCarAsync(CarSaveDto model)
    {
        if (await _context.Cars.AnyAsync(x => x.PlateNumber == model.PlateNumber))
        {
            throw new Exception("Car already exists.");
        }

        var car = _mapper.Map<Car>(model);

        car.CreateDate = DateTime.UtcNow;
        car.CreatedById = GetCurrentUserId();

        _context.Cars.Add(car);

        await _context.SaveChangesAsync();

        return _mapper.Map<CarDto>(car);
    }

    public async Task DeleteCarAsync(Guid id)
    {
        var car = await _context.Cars.FindAsync(id);

        if (car == null)
        {
            throw new KeyNotFoundException($"Car with id {id} not found.");
        }

        _context.Cars.Remove(car);

        var result = await _context.SaveChangesAsync() > 0;

        if (!result)
        {
            throw new Exception("Failed to delete the Car.");
        }
    }

    private string GetCurrentUserId()
    {
        return _httpContextAccessor
            .HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value
                ?? null!;
    }

    public async Task<bool> CreateBooking(BookingSaveDto model)
    {
        if (model is not null) return false!;

        var  booking = _mapper.Map<Booking>(model);

        _context.Bookings.Add(booking);

        var result = await _context.SaveChangesAsync() > 0;

        if (result) return true;

        return false;
    }
}
