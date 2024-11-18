using API.Helpers;

namespace API.RequestParams
{
    public class NotificationParams : PaginParams
    {
        public int? Count { get; set; }
        public bool? IsRead { get; set; }
    }
}