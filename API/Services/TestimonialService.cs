using API.Data;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using API.RequestParams;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

public class TestimonialService : ITestimonialService
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public TestimonialService(DataContext context, IMapper mapper, IHttpContextAccessor httpContextAccessor)
    {
        _context = context;
        _mapper = mapper;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task<PagedList<TestimonialDto>> GetAllTestimonialsAsync(TestimonialParams testimonialParams)
    {
        var query = _context.Testimonials
            .Where(x => !x.IsDeleted)
            .AsNoTracking()
            .OrderByDescending(x => x.CreateDate)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(testimonialParams.SearchTerm))
        {
            var term = testimonialParams.SearchTerm.Trim().ToLower();
            query = query.Where(x => x.CustomerName.ToLower().Contains(term) || x.Message.ToLower().Contains(term));
        }

        return await PagedList<TestimonialDto>.CreateAsync(
            query.ProjectTo<TestimonialDto>(_mapper.ConfigurationProvider),
            testimonialParams.PageNumber,
            testimonialParams.PageSize
        );
    }

    public async Task<TestimonialDto> AddTestimonialAsync(TestimonialSaveDto model)
    {
        var entity = _mapper.Map<Testimonial>(model);
        entity.Id = Guid.NewGuid();
        entity.CreateDate = TimeHelper.GetCurrentTimeInAbuDhabi();
        entity.CreatedById = GetCurrentUserId();

        _context.Testimonials.Add(entity);
        await _context.SaveChangesAsync();

        return _mapper.Map<TestimonialDto>(entity);
    }

    public async Task DeleteTestimonialAsync(Guid id)
    {
        var testimonial = await _context.Testimonials.FindAsync(id);

        if (testimonial == null)
            throw new KeyNotFoundException($"Testimonial with id {id} not found.");

        testimonial.IsDeleted = true;
        var result = await _context.SaveChangesAsync() > 0;

        if (!result)
            throw new Exception("Failed to delete the testimonial.");
    }

    private string GetCurrentUserId()
    {
        return _httpContextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? null!;
    }
}
