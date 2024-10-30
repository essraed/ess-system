
using System.ComponentModel.DataAnnotations;

namespace API.DTOs.ServiceDto
{
    public class ServiceCategorySaveDto
    {
        [Required]
        public string? Name { get; set; }
    }
}