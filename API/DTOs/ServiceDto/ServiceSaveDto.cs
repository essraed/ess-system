
using System.ComponentModel.DataAnnotations;

namespace API.DTOs.ServiceDto
{
    public class ServiceSaveDto
    {
        [Required]
        public string Name { get; set; } = default!;
        [Required]
        public string Description { get; set; } = default!;
        [Required]
        public decimal Price { get; set; }
        public decimal? PriceVIP { get; set; }
        public bool isRequiredFiles { get; set; } = false;
        public string? ServiceVipName { get; set; }
        //public IFormFile? pictureFile { get; set; }
        public Guid categoryId { get; set; }
        public List<ServiceOptionSaveDto>? ServiceOptions { get; set; }
        public List<string>? RequiredFiles { get; set; }
    }
}