using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class CarSaveDto
    {
        [Required]
        public string Name { get; set; } = string.Empty;
        [Required]
        public string PlateNumber { get; set; }  = string.Empty;
        public string? Model { get; set; }
    }
}