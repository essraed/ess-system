using API.Helpers;

namespace API.DTOs
{
    public class BookingDto
    {
        public Guid Id { get; set; }

        public required string BookingCode { get; set; }
        public string? PaymentStatus { get; set; }

        public string CustomerName { get; set; } = default!;

        public string Phone { get; set; } = default!;

        public string Email { get; set; } = default!;

        public string? Address { get; set; }
        public int? AdultsNumber { get; set; }
        public int? ChildrenNumber { get; set; }
        public string? EntryType { get; set; }
        public string? Duration { get; set; }
        public string? Reason { get; set; }
        public string? ProcessTime { get; set; }
        public decimal? TotalPrice { get; set; }

        public string ServiceName { get; set; } = default!;

        public string? CarName { get; set; }

        public string? CreatedBy { get; set; }

        public string? UpdatedBy { get; set; }

        public DateTime? CreateDate { get; set; }

        public DateTime? UpdateDate { get; set; }

        public BookingStatus? BookingStatus { get; set; }

        public DateTime? BookingDate { get; set; }

        public string? NationalityName { get; set; }
    }
}