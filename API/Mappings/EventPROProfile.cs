using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Mappings
{
    public class EventPROProfile : Profile
    {
        public EventPROProfile()
        {
                // .ForMember(dest => dest.UpdatedBy, opt => opt.MapFrom(src => 
                //     src.UpdatedBy != null ? src.UpdatedBy.DisplayName : string.Empty));

            CreateMap<EventPROSaveDto, EventPRO>();
            CreateMap<EventPRO, EventPRODto>();


        }
    }
}
