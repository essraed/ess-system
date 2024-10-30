
using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class ServiceOptionSaveDto
    {
        [Required]
        public string Name { get; set; } = default!;

        [Required]
        public decimal AdditionalFee { get; set; }


        // related tables
        public Guid? ServiceId { get; set; }
        public Service? Service { get; set; }
    }
}