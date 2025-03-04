
using API.DTOs;
using API.Helpers;
using API.RequestParams;

namespace API.Interfaces
{
    public interface IEventService
    {
        Task<PagedList<EventDto>> GetAllEventsAsync(EventParams eventParams);
        Task<EventDto> AddEventAsync(EventSaveDto model);
    }
}