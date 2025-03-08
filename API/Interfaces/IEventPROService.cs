
using API.DTOs;
using API.Helpers;
using API.RequestParams;

namespace API.Interfaces
{
    public interface IEventPROService
    {
        Task<PagedList<EventPRODto>> GetAllEvents(EventPROParams eventParams);
        Task<EventPRODto> AddEventPROAsync(EventPROSaveDto model);


    }
}