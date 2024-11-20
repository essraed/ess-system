
using API.Data;
using API.DTOs;
using API.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
    public class GenericService<T> : IGenericService<T> where T : class
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;

    public GenericService(DataContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<IList<DropdownDto>> GetAllDropdownAsync()
    {
        var entities = await _context.Set<T>().ToListAsync();
        return _mapper.Map<IList<DropdownDto>>(entities);
    }
}

}
