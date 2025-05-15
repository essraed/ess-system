
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using API.Helpers;

namespace API.Entities
{
    public class Blog
    {
        public Guid Id { get; set; }
        [Required]
        public required string BlogTitle { get; set; } = default!;
        [Required]
        public string BlogContent { get; set; } = default!;
        public DateTime? CreateDate { get; set; }
        public DateTime? UpdateDate { get; set; }
        public string? CreatedById { get; set; }
        public AppUser? CreatedBy { get; set; }

        public bool IsDeleted { get; set; } = false;

        public ICollection<FileEntity>? FileEntities { get; set; }

        public ICollection<Post>? Posts { get; set; }


    }
}