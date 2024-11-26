
using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class UserPromptDto
    {
        [Required]
        public string Brief { get; set; } = string.Empty;
        
        public string? Name { get; set; }
        public string? Phone { get; set; }
        public string? Address { get; set; }
        public string? Email { get; set; }
        public string? EmiratesId { get; set; }
        public Guid? AuthorityId { get; set; } = default!;
    }
}