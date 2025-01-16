using API.Helpers;

namespace API.RequestParams
{
    public class NotificationParams : PaginParams
    {
        public int? Count { get; set; }
        public string? IsRead { get; set; }

        public DateTime? From { get; set; }
        public DateTime? To { get; set; }
    }
}