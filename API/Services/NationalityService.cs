using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
    public class NationalityService : INationalityService
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public NationalityService(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // Get all nationalities
        public async Task<IEnumerable<NationalityDto>> GetAllAsync()
        {
            var nationalities = await _context.Nationalities.ToListAsync();
            return _mapper.Map<IEnumerable<NationalityDto>>(nationalities);
        }


        public async Task<NationalityDto> GetNationalityItemById(Guid id)
        {
            var nationality = await _context.Nationalities
                .FirstOrDefaultAsync(x => x.Id == id);

            if (nationality == null)
            {
                throw new KeyNotFoundException($"nationality item with id {id} not found.");
            }

            return _mapper.Map<NationalityDto>(nationality);
        }

    }
}
