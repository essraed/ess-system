
namespace API.Entities
{
    public class ServiceCategoryDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = default!;
        public DateTime? CreateDate { get; set; }
        public string? CreatedByName {get; set; }
    }
}