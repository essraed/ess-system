
using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class Contact
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public required string Phone { get; set; }
        public string? Email { get; set; }
        public required string Subject { get; set; }
        public required string Message { get; set; }
        
        public bool IsBussinesSetup { get; set; }
        public bool IsDeleted { get; set; }

        [DisplayFormat(
            DataFormatString = "{0:dd-MM-yyyy hh:mm tt}",
            ApplyFormatInEditMode = true
        )]
        public DateTime? CreateDate { get; set; }
    }
}