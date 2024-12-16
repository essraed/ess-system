
namespace API.DTOs.ContactDto
{
    public class ContactDto
    {
         public Guid Id { get; set; }
        public required string Name { get; set; }
        public required string Phone { get; set; }
        public string? Email { get; set; }
        public required string Message { get; set; }
        public bool EnquiryType { get; set; }
        public string? LicenseType { get; set; }
        public bool? Ejari { get; set; }
        public bool? LocalAgent { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime? CreateDate { get; set; }
    }
}