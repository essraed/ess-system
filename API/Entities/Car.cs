using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class Car
    {
        public Guid Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;
        public string? Model { get; set; }

        [Required]
        public string PlateNumber { get; set; } = string.Empty;

        public DateTime? CreateDate { get; set; }

        public string? CreatedById { get; set; }
        public AppUser? CreatedBy { get; set; }

        public ICollection<Booking>? Bookings { get; set; }
    }
}