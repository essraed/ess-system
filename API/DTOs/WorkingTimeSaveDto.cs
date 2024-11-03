
namespace API.DTOs
{
    public class WorkingTimeSaveDto
    {
        public DayOfWeek Day { get; set; }
        public TimeOnly FromTime { get; set; }
        public TimeOnly ToTime { get; set; }
    }
}