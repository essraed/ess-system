using API.Helpers;

namespace API.RequestParams
{
    public class CarParams : PaginParams
    {
        public string? SearchTerm { get; set; }
    }
}