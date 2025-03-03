using System.Security.Claims;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using API.RequestParams;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

public class BlogService : IBlogService
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;
    private readonly IHttpContextAccessor _httpContextAccessor;


    public BlogService(DataContext context, IMapper mapper,
        IHttpContextAccessor httpContextAccessor)
    {
        _context = context;
        _mapper = mapper;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task<PagedList<BlogDetailsDto>> GetAllBlogsAsync(BlogParams blogParams)
    {
        var query =
            _context.Blogs
            .Include(x => x.CreatedBy)
            .AsNoTracking()
                .AsQueryable();

        if (!string.IsNullOrWhiteSpace(blogParams.SearchTerm))
        {
            var searchTerm = blogParams.SearchTerm.Trim().ToLower();
            query = query.Where(x => x.BlogTitle.ToLower().Contains(searchTerm) ||
                (!string.IsNullOrEmpty(x.BlogContent) && x.BlogContent.ToLower().Contains(searchTerm))
                );
        }


        return await PagedList<BlogDetailsDto>.CreateAsync(
           query.ProjectTo<BlogDetailsDto>(_mapper.ConfigurationProvider),
           blogParams.PageNumber,
           blogParams.PageSize);

    }


    public async Task<BlogDetailsDto> GetBlogByIdAsync(Guid id)
    {
        var blog = await _context.Blogs.FindAsync(id);
        if (blog == null)
        {
            throw new KeyNotFoundException($"blog with id {id} not found.");
        }
        return _mapper.Map<BlogDetailsDto>(blog);
    }

    public async Task<BlogDetailsDto> AddBlogAsync(BlogSaveDto model)
    {
        if (await _context.Blogs.AnyAsync(x => x.BlogTitle == model.BlogTitle))
        {
            throw new Exception("Blog already exists.");
        }

        var blog = _mapper.Map<Blog>(model);    

        blog.CreateDate = TimeHelper.GetCurrentTimeInAbuDhabi();
        blog.CreatedById = GetCurrentUserId();

        _context.Blogs.Add(blog);

        await _context.SaveChangesAsync();

        return _mapper.Map<BlogDetailsDto>(blog);
    }

    public async Task DeleteBlogAsync(Guid id)
    {
        var blog = await _context.Blogs.FindAsync(id);

        if (blog == null)
        {
            throw new KeyNotFoundException($"Blog with id {id} not found.");
        }
        blog.IsDeleted=true;
        var result = await _context.SaveChangesAsync() > 0;

        if (!result)
        {
            throw new Exception("Failed to delete the Blog.");
        }
    }

    private string GetCurrentUserId()
    {
        return _httpContextAccessor
            .HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value
                ?? null!;
    }
}
