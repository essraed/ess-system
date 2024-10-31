using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs.ServiceDto;
using API.Helpers;
using API.RequestParams;

namespace API.Interfaces
{
    public interface IServiceService
    {
        Task<PagedList<ServiceDto>> GetAllServicesAsync(ServiceParams serviceParams);
        Task<ServiceDto> GetServiceByIdAsync(Guid id);
        Task<ServiceDto> AddServiceAsync(ServiceSaveDto model);
        Task UpdateServiceAsync(Guid id, ServiceSaveDto model);
        Task DeleteServiceAsync(Guid id);
    }
}