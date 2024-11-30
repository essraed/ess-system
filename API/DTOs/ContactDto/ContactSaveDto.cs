namespace API.DTOs.ContactDto
{
    public class ContactSaveDto
    {
        public required string Name { get; set; }
        public required string Phone { get; set; }
        public string? Email { get; set; }
        public required string Subject { get; set; }
        public required string Message { get; set; }
        public bool IsBussinesSetup { get; set; }
    }
}