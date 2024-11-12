
using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Mappings
{
    public class WorkingTimesProfile : Profile
    {
        public WorkingTimesProfile()
        {
            CreateMap<WorkingTime, WorkingTimeDto>()
                .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src =>
                    src.CreatedBy != null ? src.CreatedBy.DisplayName : string.Empty));

            CreateMap<WorkingTime, WorkingTimeAvailableDto>();

            CreateMap<WorkingTimeSaveDto, WorkingTime>();
        }
    }
}
