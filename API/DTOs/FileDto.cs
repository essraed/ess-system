namespace API.DTOs
{
    public class FileUploadNewDto
    {
        public required IList<IFormFile> Files { get; set; }
        public required string directory { get; set; }
        public Guid? EntityId { get; set; }
    }

    public class FileUpdateDto
    {
        public required IFormFile File { get; set; }
        public required string directory { get; set; }
    }

    public class FileResponseDto
    {
        public Guid Id { get; set; }
        public string? FileName { get; set; }
        public string? FilePath { get; set; }
        public string? ContentType { get; set; }
        public long Size { get; set; }



        // related tables
        public DateTime? CreateDate { get; set; }
        public DateTime? UpdateDate { get; set; }
        public string? CreatedBy { get; set; }
        public string? UpdatedBy { get; set; }
        public Guid? ServiceId { get; set; }
        public Guid? CategoryId { get; set; }
    }

}