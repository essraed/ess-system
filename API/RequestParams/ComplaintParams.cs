using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Helpers;

namespace API.RequestParams
{
    public class ComplaintParams : PaginParams
    {
        public string? SearchTerm { get; set; }
        public DateTime? From { get; set; }
        public DateTime? To { get; set; }
        public ComplaintStatus? ComplaintStatus { get; set; }
        public string? Type { get; set; }
    }
}