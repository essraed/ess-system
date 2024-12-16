
using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class Contact
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

        [DisplayFormat(
            DataFormatString = "{0:dd-MM-yyyy hh:mm tt}",
            ApplyFormatInEditMode = true
        )]
        public DateTime? CreateDate { get; set; }
    }
}