using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Mappings
{
    public class EventProfile : Profile
    {
        public EventProfile()
        {
                // .ForMember(dest => dest.UpdatedBy, opt => opt.MapFrom(src => 
                //     src.UpdatedBy != null ? src.UpdatedBy.DisplayName : string.Empty));

            CreateMap<EventSaveDto, Event>();
            CreateMap<Event, EventDto>();


        }
    }
}
