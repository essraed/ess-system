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

public class AuthorityService : IAuthorityService
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;
    private readonly IHttpContextAccessor _httpContextAccessor;
    public IGenericService<Authority> _genericService;

    public AuthorityService(DataContext context, IMapper mapper,
        IHttpContextAccessor httpContextAccessor, IGenericService<Authority> genericService)
    {
        _mapper = mapper;
        _context = context;
        _genericService = genericService;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task<PagedList<AuthorityDto>> GetAllAuthoritiesAsync(AuthorityParams authorityParams)
    {
        var query = _context.Authorities
            .Include(x => x.CreatedBy)
            .Include(x => x.UpdatedBy)
            .AsNoTracking()
            .OrderByDescending(x => x.CreateDate)
            .AsQueryable();

        if (!string.IsNullOrEmpty(authorityParams.SearchTerm))
        {
            query = query.Where(x => x.Name.Contains(authorityParams.SearchTerm));
        }

        return await PagedList<AuthorityDto>.CreateAsync(
            query.ProjectTo<AuthorityDto>(_mapper.ConfigurationProvider),
            authorityParams.PageNumber,
            authorityParams.PageSize);
    }

    public async Task<List<DropdownDto>> GetAllDropdownAsync()
    {
        return _mapper.Map<List<DropdownDto>>(await _genericService.GetAllDropdownAsync());
    }

    public async Task<AuthorityDto> GetAuthorityByIdAsync(Guid id)
    {
        var authority = await _context.Authorities.FindAsync(id);
        if (authority == null)
        {
            throw new KeyNotFoundException($"Authority with id {id} not found.");
        }
        return _mapper.Map<AuthorityDto>(authority);
    }

    public async Task<AuthorityDto> AddAuthorityAsync(AuthoritySaveDto model)
    {
        if (await _context.Authorities.AnyAsync(x => x.Name == model.Name))
        {
            throw new Exception("Authority already exists.");
        }

        var authority = _mapper.Map<Authority>(model);

        authority.CreateDate = TimeHelper.GetCurrentTimeInAbuDhabi();
        authority.CreatedById = GetCurrentUserId();

        _context.Authorities.Add(authority);

        await _context.SaveChangesAsync();

        return _mapper.Map<AuthorityDto>(authority);
    }

    public async Task UpdateAuthorityAsync(Guid id, AuthoritySaveDto model)
    {
        var authority = await _context.Authorities.FindAsync(id);

        if (authority == null)
        {
            throw new KeyNotFoundException($"Authority with id {id} not found.");
        }

        _mapper.Map(model, authority);

        authority.UpdateDate = TimeHelper.GetCurrentTimeInAbuDhabi();
        authority.UpdatedById = GetCurrentUserId();

        var result = await _context.SaveChangesAsync() > 0;

        if (!result)
        {
            throw new Exception("Failed to update the Authority.");
        }
    }

    public async Task DeleteAuthorityAsync(Guid id)
    {
        var authority = await _context.Authorities.FindAsync(id);

        if (authority == null)
        {
            throw new KeyNotFoundException($"Authority with id {id} not found.");
        }

        _context.Authorities.Remove(authority);

        var result = await _context.SaveChangesAsync() > 0;

        if (!result)
        {
            throw new Exception("Failed to delete the Authority.");
        }
    }

    private string GetCurrentUserId()
    {
        return _httpContextAccessor
            .HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value
                ?? null!;
    }

}