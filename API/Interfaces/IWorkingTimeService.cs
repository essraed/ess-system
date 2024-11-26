using API.DTOs;

namespace API.Interfaces
{
    public interface IWorkingTimeService
    {
        Task<IEnumerable<WorkingTimeDto>> GetAllAsync();
        Task<WorkingTimeDto> CreateAsync(WorkingTimeSaveDto workingTimeSaveDto);
        Task<WorkingTimeAvailableDto> GetAvailableWorkingTimes(DayOfWeek day);
    }
}