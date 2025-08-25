
using System.ComponentModel.DataAnnotations;

namespace API.DTOs.ServiceDto
{
    public class CategorySaveDto
    {
        [Required]
        public string? Name { get; set; }
        public string? Description { get; set; }
        public bool IsUber { get; set; }


        // public IFormFile pictureFile { get; set; }
    }
}