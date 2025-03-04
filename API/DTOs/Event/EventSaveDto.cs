using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.DTOs
{
    public class EventSaveDto
    {
        public required string EmployeeName { get; set; }
        public required string EmployeeCode { get; set; } = default!;
        public required string Department { get; set; }
        public bool? IsComing { get; set; }
    }
}