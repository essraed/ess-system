using API.Helpers;

namespace API.RequestParams
{
    public class UserParams : PaginParams
    {
        public string? SearchTerm { get; set; }
    }
}