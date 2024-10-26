using API.Helpers;

namespace API.RequestParams
{
    public class AuthorityParams : PaginParams
    {
        public string? SearchTerm { get; set; }
    }
}