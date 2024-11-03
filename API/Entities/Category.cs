
using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class Category
    {
        public Guid Id { get; set; }

        [Required]
        public string Name { get; set; } = default!;
        public DateTime? CreateDate { get; set; }
        public string? CreatedById { get; set; }
        public AppUser? CreatedBy {get; set; }
        public bool IsDeleted {get; set; } = false;

        // related tables
        public ICollection<Service>? Services { get; set; }
    }
}