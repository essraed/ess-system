using API.DTOs.ServiceDto;
using API.Entities;
using AutoMapper;

namespace API.Mappings
{
    public class ServicesProfile : Profile
    {
        public ServicesProfile()
        {
            // for category
            CreateMap<Category, CategoryDto>()
                .ForMember(dest => dest.CreatedByName, opt => opt.MapFrom(src =>
                    src.CreatedBy != null ? src.CreatedBy.DisplayName : string.Empty));

            CreateMap<CategorySaveDto, Category>();
            ;

            // for service
            CreateMap<Service, ServiceDto>()
                .ForMember(dest => dest.CreatedByName, opt => opt.MapFrom(src =>
                    src.CreatedBy != null ? src.CreatedBy.DisplayName : string.Empty))
                .ForMember(dest => dest.UpdateByName, opt => opt.MapFrom(src =>
                    src.UpdatedBy != null ? src.UpdatedBy.DisplayName : string.Empty));

            CreateMap<ServiceSaveDto, Service>()
             .ForMember(dest => dest.ServiceOptions, opt => opt.MapFrom(src => src.ServiceOptions));


            // for options
            
            CreateMap<ServiceOption, ServiceOptionDto>();

            CreateMap<ServiceOptionSaveDto, ServiceOption>();
        }
    }
}
