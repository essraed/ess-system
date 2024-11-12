

namespace API.DTOs
{
    public class AuthorityDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;

        public DateTime? CreateDate { get; set; }
        public DateTime? UpdateDate { get; set; }

        public string? CreatedBy { get; set; }
        public string? UpdatedBy { get; set; }
    }
}