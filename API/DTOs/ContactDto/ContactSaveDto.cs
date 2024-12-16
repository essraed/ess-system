namespace API.DTOs.ContactDto
{
    public class ContactSaveDto
    {
        public required string Name { get; set; }
        public required string Phone { get; set; }
        public string? Email { get; set; }
        public required string Message { get; set; }
        public string? LicenseType { get; set; }
        public bool? Ejari { get; set; }
        public bool?     LocalAgent { get; set; }
        public bool EnquiryType { get; set; }
    }
}