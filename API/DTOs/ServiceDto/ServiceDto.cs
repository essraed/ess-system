
using API.Entities;

namespace API.DTOs.ServiceDto
{
    public class ServiceDto
    {
        public Guid Id { get; set; }

        public string Name { get; set; } = default!;

        public decimal Price { get; set; }

        public decimal? TotalPrice { get; set; }

        public DateTime? CreateDate { get; set; }
        public DateTime? UpdateDate { get; set; }

        public string? CreatedByName { get; set; }
        public string? UpdateByName { get; set; }


        // related tables
        public ICollection<ServiceOptionDto>? ServiceOptions { get; set; }
    }
}