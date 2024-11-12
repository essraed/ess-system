
namespace API.DTOs
{
    public class DocumentDto
    {
        public Guid Id { get; set; }
        public string Brief { get; set; } = string.Empty;
        public string AiResult { get; set; } = string.Empty;

        public DateTime? CreateDate { get; set; }
        public DateTime? UpdateDate { get; set; }

        public string? CreatedBy { get; set; }
        public string? UpdatedBy { get; set; }
    }
}
