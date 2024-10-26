namespace API.DTOs
{
    public class MailDto
    {
        public string ToEmail { get; set; } = default!;
        public string Subject { get; set; } = default!;
        public string Body { get; set; } = default!;
        public DateTime? CreateDate { get; set; }
        public DateTime? UpdateDate { get; set; }

        public string? CreatedByName { get; set; }
        public string? UpdatedByName { get; set; }

        public IList<IFormFile>? FormFiles { get; set; }
    }
}
