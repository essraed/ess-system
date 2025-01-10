using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using API.Entities;

public class Payment
{
    [Key]
    public Guid Id { get; set; } // Primary Key

    public string? MerchantId { get; set; }

    [Required]
    [Column(TypeName = "decimal(18,2)")]
    public decimal TransactionAmount { get; set; }
    public string? TransactionHint { get; set; }
    public string? TransactionID { get; set; }
    public string? Currency { get; set; }
    public string? Status { get; set; }
    public string? TransactionStatus { get; set; }
    public string? OrderName { get; set; }
    public string? OrderID { get; set; }
    public ICollection<Booking>? Bookings { get; set; }

    [DisplayFormat(DataFormatString = "{0:dd-MM-yyyy hh:mm tt}", ApplyFormatInEditMode = true)]
    public DateTime? CreateDate { get; set; }
}
