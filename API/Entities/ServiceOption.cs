
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class ServiceOption
    {
        public Guid Id { get; set; }

        [Required]
        public string Name { get; set; } = default!;

        [Required]
        [Column(TypeName = "decimal(18, 2)")]
        public decimal AdditionalFee { get; set; }


        // related tables
        public Guid? ServiceId { get; set; }
        public Service? Service { get; set; }
    }
}