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

        public string? FilePaths { get; set; }  // Store multiple file paths separated by ";"
        
        public DateTime? CreateDate { get; set; }
        public DateTime? UpdateDate { get; set; }

        public string? CreatedById { get; set; }
        public AppUser? CreatedBy {get; set; }

        public string? UpdatedById { get; set; }
        public AppUser? UpdatedBy {get; set; }
    }
}
