using API.Helpers;

namespace API.RequestParams
{
    public class ServiceParams : PaginParams
    {
        public Guid? CategoryId { get; set; }
    }
}