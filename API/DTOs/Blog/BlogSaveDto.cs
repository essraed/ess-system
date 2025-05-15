using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.DTOs
{
    public class BlogSaveDto
    {
        [Required]
        public string BlogTitle { get; set; } = default!;
        public string BlogContent { get; set; } = default!;
        public DateTime? CreateDate { get; set; }
        public DateTime? UpdateDate { get; set; }

        public List<PostSaveDto>? Posts { get; set; }

    }
}