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
                .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src =>
                    src.CreatedBy != null ? src.CreatedBy.DisplayName : string.Empty))
                .ForMember(dest => dest.FileEntities, opt => opt.MapFrom(src =>
                   src.FileEntities));

            CreateMap<CategorySaveDto, Category>();
            ;

            // for service
            CreateMap<Service, ServiceDto>()
                .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src =>
                    src.CreatedBy != null ? src.CreatedBy.DisplayName : string.Empty))
                .ForMember(dest => dest.UpdatedBy, opt => opt.MapFrom(src =>
                    src.UpdatedBy != null ? src.UpdatedBy.DisplayName : string.Empty))
                .ForMember(dest => dest.ServiceOptions, opt => opt.MapFrom(src => src.ServiceOptions))
                .ForMember(dest => dest.CategoryId, opt => opt.MapFrom(src =>
                    src.Category != null ? src.Category.Id.ToString() : string.Empty)) // Correct mapping for CategoryId
                .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src =>
                    src.Category != null ? src.Category.Name : string.Empty))
                               .ForMember(dest => dest.FileEntities, opt => opt.MapFrom(src =>
                   src.FileEntities));


            CreateMap<ServiceSaveDto, Service>()
             .ForMember(dest => dest.ServiceOptions, opt => opt.MapFrom(src => src.ServiceOptions));


            // for options

            CreateMap<ServiceOption, ServiceOptionDto>();

            CreateMap<ServiceOptionSaveDto, ServiceOption>();
        }
    }
}
