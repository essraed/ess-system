
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using API.Helpers;

namespace API.Entities
{
    public class Booking
    {
        public Guid Id { get; set; }
        public required string BookingCode { get; set; }
        [Required]
        public string CustomerName { get; set; } = default!;
        [Required]
        public string Phone { get; set; } = default!;
        public string? Email { get; set; }
        public int? AdultsNumber { get; set; }
        public int? ChildrenNumber { get; set; }
        public string? ProcessTime { get; set; }
        public string? Reason { get; set; }
        public string? EntryType { get; set; }
        public string? Duration { get; set; }
        public string? Address { get; set; }
        public double? Latitude { get; set; }

        public double? Longitude { get; set; }

        public string? Note { get; set; }
        public string? PaymentType { get; set; }
        public BookingStatus? BookingStatus { get; set; }

        [DisplayFormat(DataFormatString = "{0:dd-MM-yyyy hh:mm tt}", ApplyFormatInEditMode = true)]
        public DateTime? BookingDate { get; set; }

        [DisplayFormat(DataFormatString = "{0:dd-MM-yyyy hh:mm tt}", ApplyFormatInEditMode = true)]
        public DateTime? EndBookingDate { get; set; }

        // [Required]
        // [Column(TypeName = "decimal(18, 2)")]
        // public decimal Price { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        public decimal? TotalPrice { get; set; }

        // relate tables
        public Guid? CarId { get; set; }
        public Car? Car { get; set; }

        [DisplayFormat(DataFormatString = "{0:dd-MM-yyyy hh:mm tt}", ApplyFormatInEditMode = true)]
        public DateTime? CreateDate { get; set; }

        [DisplayFormat(DataFormatString = "{0:dd-MM-yyyy hh:mm tt}", ApplyFormatInEditMode = true)]
        public DateTime? UpdateDate { get; set; }

        public string? CreatedById { get; set; }
        public AppUser? CreatedBy { get; set; }

        public string? UpdatedById { get; set; }
        public AppUser? UpdatedBy { get; set; }

        public Guid? ServiceId { get; set; }
        public Service? Service { get; set; }
        public Guid? NationalityId { get; set; }
        public Nationality? Nationality { get; set; }

        public Guid? ServiceOptionId { get; set; }
        public ServiceOption? ServiceOption { get; set; }
        public Guid? PaymentId { get; set; }
        public Payment? Payment { get; set; }

        public Notification? Notification { get; set; }
        public ICollection<FileEntity>? FileEntities { get; set; }
        public ICollection<Client>? Clients { get; set; }
        public bool IsDeleted { get; set; }
    }
}