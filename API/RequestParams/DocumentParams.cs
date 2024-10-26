using API.Helpers;

namespace API.RequestParams
{
    public class DocumentParams : PaginParams
    {
        public string? SearchTerm { get; set; }
        public DateTime? From { get; set; }
        public DateTime? To { get; set; }
        public string? UserId { get; set; }
        public Guid? AuthorityId { get; set; }
    }
}