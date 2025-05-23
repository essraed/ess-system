using API.DTOs;
using API.Entities;
using API.Helpers;
using API.RequestParams;

public interface ITestimonialService
{
    Task<PagedList<TestimonialDto>> GetAllTestimonialsAsync(TestimonialParams testimonialParams);
    Task<TestimonialDto> AddTestimonialAsync(TestimonialSaveDto model);
    Task DeleteTestimonialAsync(Guid id);
}
