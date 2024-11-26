using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.DTOs
{
    public class BookingSaveDto
    {
        [Required]
        public string CustomerName { get; set; } = default!;

        [Required]
        public string Phone { get; set; } = default!;

        [Required]
        public string Email { get; set; } = default!;
        
        public string? Address { get; set; }

        public double? Latitude { get; set; }

        public double? Longitude { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        public decimal? TotalPrice { get; set; }

        public DateOnly BookingDate { get; set; }
        public string BookingTime { get; set; }
        
        public DateOnly? EndBookingDate { get; set; }
        public string? EndBookingTime { get; set; }


        // relate tables
        public Guid? ServiceId { get; set; }

        public Guid? ServiceOptionId { get; set; }
    }
}