
namespace API.DTOs
{
    public class DocumentDto
    {
        public Guid Id { get; set; }
        public string Brief { get; set; } = string.Empty;
        public string AiResult { get; set; } = string.Empty;

        public DateTime? CreateDate { get; set; }
        public DateTime? UpdateDate { get; set; }

        public string? CreatedByName { get; set; }
        public string? UpdatedByName { get; set; }
    }
}
