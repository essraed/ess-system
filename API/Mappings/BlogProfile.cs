using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Mappings
{
    public class BlogProfile : Profile
    {
        public BlogProfile()
        {
            CreateMap<Blog, BlogDetailsDto>()
                .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src =>
                    src.CreatedBy != null ? src.CreatedBy.DisplayName : string.Empty))
                     .ForMember(dest => dest.FileEntities, opt => opt.MapFrom(src =>
                   src.FileEntities))
                    .ForMember(dest => dest.Posts, opt => opt.MapFrom(src => src.Posts));


            // .ForMember(dest => dest.UpdatedBy, opt => opt.MapFrom(src => 
            //     src.UpdatedBy != null ? src.UpdatedBy.DisplayName : string.Empty));

            CreateMap<BlogSaveDto, Blog>()
             .ForMember(dest => dest.Posts, opt => opt.MapFrom(src => src.Posts));

            CreateMap<Post, PostDto>()
            .ForMember(dest => dest.PostSections, opt => opt.MapFrom(src => src.PostSections));
            CreateMap<PostSaveDto, Post>()
            .ForMember(dest => dest.PostSections, opt => opt.MapFrom(src => src.PostSections));

              CreateMap<PostSection, PostSectionDto>();
            CreateMap<PostSectionSaveDto, PostSection>();


        }
    }
}
