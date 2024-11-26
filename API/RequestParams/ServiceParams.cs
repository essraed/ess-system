using API.Helpers;

namespace API.RequestParams
{
    public class ServiceParams : PaginParams
    {
        public string? SearchTerm { get; set; }
        public DateTime? From { get; set; }
        public DateTime? To { get; set; }
        public string? UserId { get; set; }
        public Guid? CategoryId { get; set; }
    }
}