using API.Helpers;

namespace API.RequestParams
{
    public class ContactParams : PaginParams
    {
        public string? SearchTerm { get; set; }
        
        public DateTime? From { get; set; }
        public DateTime? To { get; set; }

        public string? enquiryType {get;set;}
    }
}