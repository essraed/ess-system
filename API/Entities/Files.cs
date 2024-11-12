using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class Files
    {
        public Guid Id { get; set; }

        [Required]
        public string FileUrl { get; set; } = default!;

        // related tables
        public DateTime? CreateDate { get; set; }
        public DateTime? UpdateDate { get; set; }

        public string? CreatedById { get; set; }
        public AppUser? CreatedBy {get; set; }

        public string? UpdatedById { get; set; }
        public AppUser? UpdatedBy {get; set; }
    }
}