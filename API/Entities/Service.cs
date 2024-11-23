

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class Service
    {
        public Guid Id { get; set; }

        [Required]
        public string Name { get; set; } = default!;
        
        [Required]
        public string Description { get; set; }  = default!;
        public string? PictureUrl { get; set; }
        public float? Rate { get; set; }
        
        [Required]
        [Column(TypeName = "decimal(18, 2)")]
        public decimal Price { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        public decimal? PriceVIP { get; set; }
        public string? ServiceVipName { get; set; }
        
        [Column(TypeName = "decimal(18, 2)")]
        public decimal? TotalPrice { get; set; }

[DisplayFormat(DataFormatString = "{0:dd-MM-yyyy hh:mm tt}", ApplyFormatInEditMode = true)]
        public DateTime? CreateDate { get; set; }

        [DisplayFormat(DataFormatString = "{0:dd-MM-yyyy hh:mm tt}", ApplyFormatInEditMode = true)]
        public DateTime? UpdateDate { get; set; }

        public string? CreatedById { get; set; }
        public AppUser? CreatedBy { get; set; }

        public string? UpdatedById { get; set; }
        public AppUser? UpdatedBy { get; set; }

        public bool IsDeleted { get; set; } = false;


        // related tables

        public Guid? CategoryId { get; set; }
        public Category? Category { get; set; }


        public ICollection<ServiceOption>? ServiceOptions { get; set; }
    }
}