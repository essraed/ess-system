using API.Helpers;

namespace API.RequestParams
{
    public class BookingParams : PaginParams
    {
        public BookingStatus? BookingStatus { get; set; }
        public DateOnly? From { get; set; }
        public DateOnly? To { get; set; }
        public Guid? ServiceId { get; set; }
    }
}