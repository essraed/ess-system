
using System.ComponentModel.DataAnnotations;

namespace API.DTOs.ServiceDto
{
    public class CategorySaveDto
    {
        [Required]
        public string? Name { get; set; }
    }
}