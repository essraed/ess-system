using API.Helpers;

namespace API.RequestParams
{
    public class EventParams : PaginParams
    {
        public string? SearchTerm { get; set; }
    }
}