using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class DocumentCreateDto
    {
        [Required, MaxLength]
        public string Brief { get; set; } = string.Empty;

        [Required, MaxLength]
        public string AiResult { get; set; } = string.Empty;

        public Guid? AuthorityId { get; set; }
    }
}
