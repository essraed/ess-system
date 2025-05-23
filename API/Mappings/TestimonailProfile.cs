
using API.Entities;
using AutoMapper;

namespace API.Mappings
{
    public class TestimonialProfile : Profile
    {
        public TestimonialProfile()
        {
            CreateMap<Testimonial, TestimonialDto>()
                .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src =>
                    src.CreatedBy != null ? src.CreatedBy.DisplayName : string.Empty));
            CreateMap<TestimonialSaveDto, Testimonial>();
        }
    }
}