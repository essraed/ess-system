namespace API.DTOs
{
    public class CarDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string PlateNumber { get; set; }  = string.Empty;
        public string? Model { get; set; }

        public DateTime? CreateDate { get; set; }

        public string? CreatedByName { get; set; }
    }
}