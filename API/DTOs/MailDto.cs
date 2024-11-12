namespace API.DTOs
{
    public class MailDto
    {
        public string ToEmail { get; set; } = default!;
        public string Subject { get; set; } = default!;
        public string Body { get; set; } = default!;
        public DateTime? CreateDate { get; set; }
        public DateTime? UpdateDate { get; set; }

        public string? CreatedBy { get; set; }
        public string? UpdatedBy { get; set; }

        public IList<IFormFile>? FormFiles { get; set; }
    }
}
