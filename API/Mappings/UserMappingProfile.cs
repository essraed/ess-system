using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Mappings
{
    public class UserMappingProfile: Profile
    {
         public UserMappingProfile()
         {
            CreateMap<AppUser, UserIdAndNameDto>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.DisplayName, opt => opt.MapFrom(src => src.DisplayName));
         }
    }
}