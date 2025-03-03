
using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class FileEntity
    {
        public Guid Id { get; set; }
        public required string FileName { get; set; }
        public required string FilePath { get; set; }
        public required string ContentType { get; set; }
        public long? Size { get; set; }

        // related tables

        [DisplayFormat(DataFormatString = "{0:dd-MM-yyyy hh:mm tt}", ApplyFormatInEditMode = true)]
        public DateTime? CreateDate { get; set; }

        [DisplayFormat(DataFormatString = "{0:dd-MM-yyyy hh:mm tt}", ApplyFormatInEditMode = true)]
        public DateTime? UpdateDate { get; set; }

        public string? CreatedById { get; set; }
        public AppUser? CreatedBy { get; set; }

        public string? UpdatedById { get; set; }
        public AppUser? UpdatedBy { get; set; }

        public Guid? CategoryId { get; set; }
        public Category? Category { get; set; }

        public Guid? ServiceId { get; set; }
        public Service? Service { get; set; }
        public Guid? BookingId { get; set; }
        public Booking? Booking { get; set; }
        public Guid? ClientId { get; set; }
        public Client? Client { get; set; }
    }

}