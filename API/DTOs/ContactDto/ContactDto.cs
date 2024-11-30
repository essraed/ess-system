
namespace API.DTOs.ContactDto
{
    public class ContactDto
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public required string Phone { get; set; }
        public string? Email { get; set; }
        public required string Subject { get; set; }
        public required string Message { get; set; }
        public bool IsBussinesSetup { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime? CreateDate { get; set; }
    }
}