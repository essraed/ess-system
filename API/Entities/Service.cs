
using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class Service
    {
        public Guid Id { get; set; }

        [Required]
        public string Name { get; set; } = default!;

        public string? PictureUrl { get; set; }

        [Required]
        public decimal Price { get; set; }

        public decimal? TotalPrice { get; set; }

        public DateTime? CreateDate { get; set; }
        public DateTime? UpdateDate { get; set; }

        public string? CreatedById { get; set; }
        public AppUser? CreatedBy {get; set; }

        public string? UpdatedById { get; set; }
        public AppUser? UpdatedBy {get; set; }


        // related tables

        public Guid? ServiceId { get; set; }
        public ServiceCategory? ServiceCategory { get; set; }


        public ICollection<ServiceOption>? ServiceOptions { get; set; }
    }
}