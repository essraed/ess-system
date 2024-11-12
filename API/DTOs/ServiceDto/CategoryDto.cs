
namespace API.Entities
{
    public class CategoryDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = default!;

        public string? PictureUrl { get; set; }
        
        public DateTime? CreateDate { get; set; }
        public string? CreatedBy {get; set; }
    }
}