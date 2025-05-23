
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using API.Helpers;

namespace API.Entities
{
    public class TestimonialSaveDto
    {
        public string CustomerName { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
    }

}