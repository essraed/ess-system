using System.ComponentModel.DataAnnotations;

namespace API.Models.Identity
{
    public class RegisterDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;

        [Required]
        public string DisplayName { get; set; } = string.Empty;

        public string? Role { get; set; } = string.Empty;
    }
    public class RegisterDtoByEmail
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string DisplayName { get; set; } = string.Empty;

    }
}