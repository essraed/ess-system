

namespace API.Entities
{
    public class Booking
    {
        public Guid Id { get; set; }
        public DateTime? BookingDate { get; set; }
        public DateTime? EndBookingDate { get; set; }

        public string? BookingById { get; set; }
        public AppUser? BookingBy { get; set; }

        public Guid? CarId { get; set; }
        public Car? Car { get; set; }
    }
}