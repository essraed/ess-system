using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class DocumentUpdateDto
    {
        [Required, MaxLength]
        public string AiResult { get; set; } = string.Empty;
    }
}
