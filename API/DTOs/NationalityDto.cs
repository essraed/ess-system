
namespace API.DTOs
{
    public class NationalityDto
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public required decimal SinglePriceWithMonth { get; set; }
        public required decimal SinglePriceWithTwoMonth { get; set; }
        public required decimal SinglePriceWithTwoMonthForChild { get; set; }
        public required decimal MultiplePriceWithMonth { get; set; }
        public required decimal MultiplePriceWithMonthForChild { get; set; }
        public required decimal MultiplePriceWithTwoMonth { get; set; }
        public required decimal MultiplePriceWithTwoMonthForChild { get; set; }
    }
}