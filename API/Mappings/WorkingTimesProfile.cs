
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
        src.CreatedBy != null ? src.CreatedBy.DisplayName : string.Empty))
    .ForMember(dest => dest.Day, opt => opt.MapFrom(src => src.Day.ToString()));


            CreateMap<WorkingTime, WorkingTimeAvailableDto>();

            CreateMap<WorkingTimeSaveDto, WorkingTime>()
             .ForMember(dest => dest.FromTime, opt => opt.MapFrom(src => TimeOnly.Parse(src.FromTime)))
             .ForMember(dest => dest.ToTime, opt => opt.MapFrom(src => TimeOnly.Parse(src.ToTime)));
        }
    }
}
