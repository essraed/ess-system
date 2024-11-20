
using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Mappings
{
    public class GenericMappingProfile : Profile
    {
        public GenericMappingProfile()
        {
            CreateMap<Authority, DropdownDto>();
            CreateMap<Category, DropdownDto>();
            CreateMap<Service, DropdownDto>();
        }
    }
}