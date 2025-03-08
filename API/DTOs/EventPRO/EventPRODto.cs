using API.Helpers;

namespace API.DTOs
{
    public class EventPRODto
    {
        public Guid Id { get; set; }
        public required string PROName { get; set; }
        public string? PROCode { get; set; }
        public string Email { get; set; } = default!;
        public DateTime? CreateDate { get; set; }
        public bool? IsComing { get; set; }
    }
}