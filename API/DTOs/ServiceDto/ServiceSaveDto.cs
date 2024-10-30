
using API.Entities;

namespace API.DTOs.ServiceDto
{
    public class ServiceSaveDto
    {
        public string Name { get; set; } = default!;
        public decimal Price { get; set; }
        public IFormFile? File { get; set; }
        public Guid? ServiceId { get; set; }

        public ICollection<ServiceOptionSaveDto>? ServiceOptions { get; set; }
    }
}