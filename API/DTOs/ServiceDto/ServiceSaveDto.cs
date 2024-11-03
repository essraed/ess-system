
using System.ComponentModel.DataAnnotations.Schema;
using API.Entities;

namespace API.DTOs.ServiceDto
{
    public class ServiceSaveDto
    {
        public string Name { get; set; } = default!;

        [Column(TypeName = "decimal(18, 2)")]
        public decimal Price { get; set; }

        public List<ServiceOptionSaveDto>? ServiceOptions { get; set; }
    }
}