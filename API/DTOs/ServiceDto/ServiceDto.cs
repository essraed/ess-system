namespace API.DTOs.ServiceDto
{
    public class ServiceDto
    {
        public Guid Id { get; set; }

        public string Name { get; set; } = default!;
        public string Description { get; set; } = default!;
        public float? Rate { get; set; }
        public decimal? Price { get; set; }
        public decimal? PriceVIP { get; set; }
        public string? ServiceVipName { get; set; }
        public decimal? TotalPrice { get; set; }
        public ICollection<FileResponseDto>? FileEntities { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? UpdateDate { get; set; }
        public string? CreatedBy { get; set; }
        public string? UpdatedBy { get; set; }
        public string? CategoryId { get; set; }
        public string? CategoryName { get; set; }
        public bool isRequiredFiles { get; set; }
        public List<string>? RequiredFiles { get; set; }

        // related tables
        public ICollection<ServiceOptionDto>? ServiceOptions { get; set; }
    }
}