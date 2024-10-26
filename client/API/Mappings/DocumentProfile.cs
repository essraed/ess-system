using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Mappings
{
    public class DocumentProfile : Profile
    {
        public DocumentProfile()
        {
            CreateMap<Document, DocumentDto>()
                .ForMember(dest => dest.CreatedByName, opt => opt.MapFrom(src => 
                    src.CreatedBy != null ? src.CreatedBy.DisplayName : string.Empty))

                .ForMember(dest => dest.UpdatedByName, opt => opt.MapFrom(src => 
                    src.UpdatedBy != null ? src.UpdatedBy.DisplayName : string.Empty));

            CreateMap<DocumentCreateDto, Document>();
            CreateMap<DocumentUpdateDto, Document>();
        }
    }
}
