using System.ComponentModel.DataAnnotations;
using API.Helpers;

namespace API.DTOs
{
    public class BookingDto
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

        public BookingStatus? BookingStatus { get; set; }

        public DateTime? BookingDate { get; set; }
        public DateTime? EndBookingDate { get; set; }
    }
}