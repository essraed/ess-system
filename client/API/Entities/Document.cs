using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class Document
    {
        [Key]
        public Guid Id { get; set; }

        [Required, MaxLength]
        public string Brief { get; set; } = string.Empty;

        [Required, MaxLength]
        public string AiResult { get; set; } = string.Empty;

        public Guid? AuthorityId { get; set; }
        [ForeignKey("AuthorityId")]
        public Authority? Authority { get; set; }

        public DateTime? CreateDate { get; set; }
        public DateTime? UpdateDate { get; set; }

        public string? CreatedById { get; set; }
        public AppUser? CreatedBy {get; set; }

        public string? UpdatedById { get; set; }
        public AppUser? UpdatedBy {get; set; }
    }
}