
    namespace API.Entities
    {
        public class WorkingTime
        {
            public Guid Id { get; set; }
            public DayOfWeek Day { get; set; }
            public TimeOnly FromTime { get; set; }
            public TimeOnly ToTime { get; set; }

            public bool IsActive { get; set; } = true;
            public DateTime? CreateDate { get; set; }
            public string? CreatedById { get; set; }
            public AppUser? CreatedBy { get; set; }
        }
    }