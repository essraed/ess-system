using API.Helpers;

namespace API.RequestParams
{
    public class PaymentParams : PaginParams
    {
        public string? SearchTerm { get; set; }
        public DateTime? From { get; set; }
        public DateTime? To { get; set; }
    }
}