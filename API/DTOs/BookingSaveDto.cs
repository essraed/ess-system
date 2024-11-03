using System.ComponentModel.DataAnnotations;

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

        public DateTime? BookingDate { get; set; }
        public DateTime? EndBookingDate { get; set; }


        // relate tables
        public Guid? ServiceId { get; set; }
    }
}