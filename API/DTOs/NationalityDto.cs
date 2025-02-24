
namespace API.DTOs
{
    public class NationalityDto
    {
        public Guid Id { get; set; }
        public string? Name { get; set; }
        public required decimal SinglePriceWithMonth { get; set; }
        public required decimal SinglePriceWithTwoMonth { get; set; }
        public required decimal MultiplePriceWithMonth { get; set; }
        public required decimal MultiplePriceWithTwoMonth { get; set; }
    }
}