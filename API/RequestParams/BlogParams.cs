using API.Helpers;

namespace API.RequestParams
{
    public class BlogParams : PaginParams
    {
        public string? SearchTerm { get; set; }
    }
}