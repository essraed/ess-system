using API.DTOs;
using API.DTOs.LostDto;
using API.Helpers;
using API.RequestParams;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface INationalityService
    {
        Task<IEnumerable<NationalityDto>> GetAllAsync();
        Task<NationalityDto> GetNationalityItemById(Guid id);
    }
}
