namespace API.DTOs
{
    public class FileUploadNewDto
    {
        public required IList<IFormFile> Files { get; set; }
        public required string directory { get; set; }
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

        public string? CreatedByName { get; set; }

        public string? UpdatedByName { get; set; }
    }

}