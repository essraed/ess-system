using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class PostSection
    {
        public Guid Id { get; set; }

        [Required]
        public string SubHeader { get; set; } = default!;

        [Required]
        public string Content { get; set; } = default!;

        [ForeignKey("Post")]
        public Guid PostId { get; set; }
        public Post Post { get; set; } = default!;
    }
}
