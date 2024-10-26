using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Mappings
{
    public class AuthorityProfile : Profile
    {
        public AuthorityProfile()
        {
            CreateMap<Authority, AuthorityDto>()
                .ForMember(dest => dest.CreatedByName, opt => opt.MapFrom(src => 
                    src.CreatedBy != null ? src.CreatedBy.DisplayName : string.Empty))
                    
                .ForMember(dest => dest.UpdatedByName, opt => opt.MapFrom(src => 
                    src.UpdatedBy != null ? src.UpdatedBy.DisplayName : string.Empty));

            CreateMap<AuthoritySaveDto, Authority>();
        }
    }
}
