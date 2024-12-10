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

    [Required]
    public string? Currency { get; set; }

    public string? ReturnUrl { get; set; }
    public string? CancelUrl { get; set; }

    [StringLength(100)]
    public string? CustomerName { get; set; }

    [Required]
    public string? CustomerEmail { get; set; }
    public string? Status { get; set; }

    public string? OrderName { get; set; }

    [Required]
    public string? CustomerPhone { get; set; }


    [ForeignKey(nameof(Booking))]
    public Guid OrderId { get; set; }

    public Booking? Booking { get; set; }

    [DisplayFormat(DataFormatString = "{0:dd-MM-yyyy hh:mm tt}", ApplyFormatInEditMode = true)]
    public DateTime? CreateDate { get; set; }
}
