using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class Category
    {
        public Guid Id { get; set; }

        [Required]
        public string Name { get; set; } = default!;

        public string? Description { get; set; }

        [NotMapped]
        public string? PictureUrl { get; set; }

        [DisplayFormat(DataFormatString = "{0:dd-MM-yyyy hh:mm tt}", ApplyFormatInEditMode = true)]
        public DateTime? CreateDate { get; set; }
        public string? CreatedById { get; set; }
        public AppUser? CreatedBy {get; set; }
        public bool IsDeleted {get; set; } = false;

        // related tables
        public ICollection<Service>? Services { get; set; }
        public ICollection<FileEntity>? FileEntities { get; set; }
    }
}
