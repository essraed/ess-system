using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class Nationality
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public required decimal SinglePriceWithMonth{get;set;}
        public required decimal SinglePriceWithTwoMonth{get;set;}
        public required decimal MultiplePriceWithMonth{get;set;}       
        public required decimal MultiplePriceWithTwoMonth{get;set;}       
        public Booking? booking { get; set; }
    }
}