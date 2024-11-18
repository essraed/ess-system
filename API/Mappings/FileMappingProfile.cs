
using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Mappings
{
    public class FileMappingProfile : Profile
    {
        public FileMappingProfile()
        {
            CreateMap<FileEntity, FileResponseDto>()
              .ForMember(dest => dest.CreateDate, opt => opt.MapFrom(src => src.CreateDate))
              .ForMember(dest => dest.CreatedByName, opt => opt.MapFrom(src => src.CreatedBy!.DisplayName))
              .ForMember(dest => dest.UpdatedByName, opt => opt.MapFrom(src => src.UpdatedBy!.DisplayName))
              ;

            CreateMap<FileUploadNewDto, FileEntity>();
        }
    }
}