using System.Security.Claims;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
    public class WorkingTimeService : IWorkingTimeService
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public WorkingTimeService(DataContext context, IMapper mapper,IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _mapper = mapper;
            _httpContextAccessor=httpContextAccessor;
        }

        public async Task<IEnumerable<WorkingTimeDto>> GetAllAsync()
        {
            var workingTimes = await _context.WorkingTimes
                .Include(x => x.CreatedBy)
                .Where(x => x.IsActive)
                .ToListAsync();

            return _mapper.Map<IEnumerable<WorkingTimeDto>>(workingTimes);
        }

        public async Task<WorkingTimeAvailableDto?> GetAvailableWorkingTimes(DayOfWeek day)
        {
            var workingTimes = await _context.WorkingTimes
                .Include(x => x.CreatedBy)
                .Where(wt => wt.Day == day && wt.IsActive)
                .ToListAsync();

            if (!workingTimes.Any())
            {
                return null;
            }


            var fromTime = workingTimes.Min(wt => wt.FromTime);
            var toTime = workingTimes.Max(wt => wt.ToTime);

            var result = new WorkingTimeAvailableDto
            {
                FromTime = fromTime.AddMinutes(30),
                ToTime = toTime
            };

            return result;
        }



        public async Task<WorkingTimeDto> CreateAsync(WorkingTimeSaveDto workingTimeSaveDto)
        {
            // Deactivate previous entries for the same day using ExecuteUpdateAsync
            await _context.WorkingTimes
                .Where(wt => wt.Day == workingTimeSaveDto.Day && wt.IsActive)
                .ExecuteUpdateAsync(setters => setters
                    .SetProperty(wt => wt.IsActive, false));

            // Create the new entry
            var newWorkingTime = _mapper.Map<WorkingTime>(workingTimeSaveDto);

            newWorkingTime.CreateDate = TimeHelper.GetCurrentTimeInAbuDhabi();
            newWorkingTime.CreatedById = GetCurrentUserId();

            _context.WorkingTimes.Add(newWorkingTime);
            await _context.SaveChangesAsync();

            return _mapper.Map<WorkingTimeDto>(newWorkingTime);
        }

        private string GetCurrentUserId()
        {
            return _httpContextAccessor
                .HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value
                    ?? null!;
        }
    }
}