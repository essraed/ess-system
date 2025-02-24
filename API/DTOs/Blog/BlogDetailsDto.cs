using API.Helpers;

namespace API.DTOs
{
    public class BlogDetailsDto
    {
        public Guid Id { get; set; }
        public required string BlogTitle { get; set; } = default!;
        public string BlogContent { get; set; } = default!;
        public DateTime? CreateDate { get; set; }
        public DateTime? UpdateDate { get; set; }
        public string? CreatedBy { get; set; }

    }
}