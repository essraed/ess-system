

namespace API.DTOs
{
    public class AuthorityDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;

        public DateTime? CreateDate { get; set; }
        public DateTime? UpdateDate { get; set; }

        public string? CreatedByName { get; set; }
        public string? UpdatedByName { get; set; }
    }
}