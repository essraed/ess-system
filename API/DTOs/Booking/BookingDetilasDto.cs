using API.Helpers;

namespace API.DTOs
{
    public class BookingDetilasDto
    {
        public Guid Id { get; set; }

        public string CustomerName { get; set; } = default!;

        public required string BookingCode { get; set; }

        public string? PaymentStatus { get; set; }

        public string? PaymentType { get; set; }

        public string Phone { get; set; } = default!;

        public string Email { get; set; } = default!;

        public string? Address { get; set; }

        public double? Latitude { get; set; }

        public double? Longitude { get; set; }

        public decimal? TotalPrice { get; set; }

        public string? Note { get; set; }

        public string ServiceName { get; set; } = default!;

        public Guid? ServiceId { get; set; }

        public string? CarName { get; set; }

        public string? CreatedBy { get; set; }

        public string? UpdatedBy { get; set; }

        public DateTime? CreateDate { get; set; }

        public DateTime? UpdateDate { get; set; }

        public string? ServiceOptionName { get; set; }

        public decimal? ServiceOptionFee { get; set; }

        public BookingStatus? BookingStatus { get; set; }

        public DateTime? BookingDate { get; set; }

        public DateTime? EndBookingDate { get; set; }

        public ICollection<FileResponseDto>? FileEntities { get; set; }

    }
}