using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class Mail
    {
        public Guid Id { get; set; }

        [Required]
        public string ToEmail { get; set; } = default!;

        [Required]
        public string Subject { get; set; } = default!;

        [Required]
        public string Body { get; set; } = default!;

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
