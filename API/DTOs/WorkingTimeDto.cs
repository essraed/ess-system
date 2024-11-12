
using System.ComponentModel;

namespace API.DTOs
{
    public class WorkingTimeDto
    {
        public Guid Id { get; set; }
        public DayOfWeek Day { get; set; }
        public TimeOnly FromTime { get; set; }
        public TimeOnly ToTime { get; set; }
        public bool IsActive { get; set; }
        public DateTime? CreateDate { get; set; }
        public string? CreatedBy { get; set; }
    }
}