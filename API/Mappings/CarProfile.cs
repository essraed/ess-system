using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Mappings
{
    public class CarProfile : Profile
    {
        public CarProfile()
        {
            CreateMap<Car, CarDto>()
                .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => 
                    src.CreatedBy != null ? src.CreatedBy.DisplayName : string.Empty));
                    
                // .ForMember(dest => dest.UpdatedBy, opt => opt.MapFrom(src => 
                //     src.UpdatedBy != null ? src.UpdatedBy.DisplayName : string.Empty));

            CreateMap<CarSaveDto, Car>();
        }
    }
}
