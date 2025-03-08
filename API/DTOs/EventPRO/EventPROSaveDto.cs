using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.DTOs
{
    public class EventPROSaveDto
    {
        public required string PROName { get; set; }
        public string? PROCode { get; set; } = default!;
        public bool? IsComing { get; set; }
        [Required]
        public string Email { get; set; } = default!;
    }
}