
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using API.Helpers;

namespace API.Entities
{
    public class Booking
    {
        public Guid Id { get; set; }

        [Required]
        public string CustomerName { get; set; } = default!;

        [Required]
        public string Phone { get; set; } = default!;

        [Required]
        public string Email { get; set; } = default!;

        public string? Address { get; set; }

        public double? Latitude { get; set; }

        public double? Longitude { get; set; }

        public string? Note { get; set; }
        public BookingStatus? BookingStatus { get; set; }

        public DateTime? BookingDate { get; set; }
        public DateTime? EndBookingDate { get; set; }

        // [Required]
        // [Column(TypeName = "decimal(18, 2)")]
        // public decimal Price { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        public decimal? TotalPrice { get; set; }

        // relate tables
        public Guid? CarId { get; set; }
        public Car? Car { get; set; }

        public DateTime? CreateDate { get; set; }
        public DateTime? UpdateDate { get; set; }

        public string? CreatedById { get; set; }
        public AppUser? CreatedBy { get; set; }

        public string? UpdatedById { get; set; }
        public AppUser? UpdatedBy { get; set; }

        public Guid? ServiceId { get; set; }
        public Service? Service { get; set; }

        public Guid? ServiceOptionId { get; set; }
        public ServiceOption? ServiceOption { get; set; }

        // public List<ServiceOption>? ServiceOptions { get; set; }
    }
}