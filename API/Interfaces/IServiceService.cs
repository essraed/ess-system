using API.DTOs;
using API.DTOs.ServiceDto;
using API.Helpers;
using API.RequestParams;

namespace API.Interfaces
{
    public interface IServiceService
    {
        Task<PagedList<ServiceDto>> GetAllServicesAsync(ServiceParams serviceParams);
        Task<ServiceDto> GetServiceByIdAsync(Guid id);
        Task<ServiceDto> AddServiceAsync(Guid categoryId, ServiceSaveDto model);
        Task UpdateServiceAsync(Guid id, ServiceSaveDto model);
        Task DeleteServiceAsync(Guid id);

        Task<string> UploadImage(FileUploadNewDto model);
    }
}