
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class ServiceOptionSaveDto
    {
        [Required]
        public string Name { get; set; } = default!;

        [Required]
        [Column(TypeName = "decimal(18, 2)")]
        public decimal AdditionalFee { get; set; }
    }
}