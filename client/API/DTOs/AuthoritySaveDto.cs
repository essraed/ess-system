

using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class AuthoritySaveDto
    {
        [Required]
        public string Name { get; set; } = string.Empty;
    }
}