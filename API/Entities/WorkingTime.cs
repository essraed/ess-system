
using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class WorkingTime
    {
        public Guid Id { get; set; }
        public DayOfWeek Day { get; set; }
        public TimeOnly FromTime { get; set; }
        public TimeOnly ToTime { get; set; }

        public bool IsActive { get; set; } = true;

        [DisplayFormat(DataFormatString = "{0:dd-MM-yyyy hh:mm tt}", ApplyFormatInEditMode = true)]
        public DateTime? CreateDate { get; set; }
        public string? CreatedById { get; set; }
        public AppUser? CreatedBy { get; set; }
    }
}