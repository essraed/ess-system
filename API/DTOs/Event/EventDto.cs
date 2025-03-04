using API.Helpers;

namespace API.DTOs
{
    public class EventDto
    {
        public Guid Id { get; set; }
        public required string EmployeeName { get; set; } = default!;
        public string EmployeeCode { get; set; } = default!;
        public DateTime? CreateDate { get; set; }
        public required string Department { get; set; }
        public bool? IsComing { get; set; }


    }
}