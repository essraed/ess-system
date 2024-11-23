
namespace API.DTOs
{
    public class WorkingTimeSaveDto
    {
        public DayOfWeek Day { get; set; }
        public string FromTime { get; set; }
        public string ToTime { get; set; }
    }
}