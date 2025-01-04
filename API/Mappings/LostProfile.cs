using API.DTOs;
using API.DTOs.ContactDto;
using API.DTOs.LostDto;
using API.Entities;
using AutoMapper;

namespace API.Mappings
{
    public class LostProfile : Profile
    {
        public LostProfile()
        {
            CreateMap<Lost, LostDto>()
             .ForMember(dest => dest.CreatedBy, opt =>
                    opt.MapFrom(src => src.CreatedBy != null ? src.CreatedBy.DisplayName : null))
                .ForMember(dest => dest.UpdatedBy, opt =>
                    opt.MapFrom(src => src.UpdatedBy != null ? src.UpdatedBy.DisplayName : null));
            CreateMap<LostSaveDto, Lost>();
        }
    }
}
