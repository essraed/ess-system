using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class Files
    {
        public Guid Id { get; set; }

        [Required]
        public string FileUrl { get; set; } = default!;

        // related tables

        [DisplayFormat(DataFormatString = "{0:dd-MM-yyyy hh:mm tt}", ApplyFormatInEditMode = true)]
        public DateTime? CreateDate { get; set; }

        [DisplayFormat(DataFormatString = "{0:dd-MM-yyyy hh:mm tt}", ApplyFormatInEditMode = true)]
        public DateTime? UpdateDate { get; set; }

        public string? CreatedById { get; set; }
        public AppUser? CreatedBy {get; set; }

        public string? UpdatedById { get; set; }
        public AppUser? UpdatedBy {get; set; }
    }
}