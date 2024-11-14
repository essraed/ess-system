
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.DTOs.ServiceDto
{
    public class ServiceOptionSaveDto
    {
        [Required]
        public string Name { get; set; } = default!;

        public string? Description { get; set; }

        [Required]
        [Column(TypeName = "decimal(18, 2)")]
        public decimal AdditionalFee { get; set; }
    }
}