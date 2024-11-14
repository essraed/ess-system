
using System.ComponentModel.DataAnnotations;

namespace API.DTOs.ServiceDto
{
    public class ServiceOptionDto
    {
        public Guid Id { get; set; }

        [Required]
        public string? Name { get; set; }
        public string? Description { get; set; }

        [Required]
        public decimal AdditionalFee { get; set; }
    }
}