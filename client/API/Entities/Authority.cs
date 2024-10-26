namespace API.Entities
{
    public class Authority
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;

        public DateTime? CreateDate { get; set; }
        public DateTime? UpdateDate { get; set; }

        public string? CreatedById { get; set; }
        public AppUser? CreatedBy {get; set; }

        public string? UpdatedById { get; set; }
        public AppUser? UpdatedBy {get; set; }

        public ICollection<Document>? Documents { get; set; }
    }
}