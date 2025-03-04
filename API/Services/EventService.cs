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

public class EventService : IEventService
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;
    private readonly IHttpContextAccessor _httpContextAccessor;

    private readonly IEmailService _emailService;


     public EventService(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

 public async Task<PagedList<EventDto>> GetAllEventsAsync(EventParams contactParams)
        {
            var query = _context.Events
                .AsNoTracking()
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(contactParams.SearchTerm))
            {
                var searchTerm = contactParams.SearchTerm.Trim().ToLower();
                query = query.Where(x => x.EmployeeName.ToLower().Contains(searchTerm));
            }

            return await PagedList<EventDto>.CreateAsync(
                query.ProjectTo<EventDto>(_mapper.ConfigurationProvider),
                contactParams.PageNumber,
                contactParams.PageSize);
        }


  public async Task<EventDto> AddEventAsync(EventSaveDto model)
    {
        if (await _context.Events.AnyAsync(x => x.EmployeeCode == model.EmployeeCode))
        {
            throw new Exception("Already submitted.");
        }

        var events = _mapper.Map<Event>(model);

        events.CreateDate = TimeHelper.GetCurrentTimeInAbuDhabi();

        _context.Events.Add(events);

        await _context.SaveChangesAsync();

        return _mapper.Map<EventDto>(events);
    }

    private string GetCurrentUserId()
    {
        return _httpContextAccessor
            .HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value
                ?? null!;
    }
}
