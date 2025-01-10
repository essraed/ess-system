using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using API.Entities;

public class PaymentDto
{
    public Guid Id { get; set; }
    public string? MerchantId { get; set; }
    public decimal TransactionAmount { get; set; }
    public string? Currency { get; set; }
    public string? Status { get; set; }
    public string? TransactionStatus { get; set; }
    public string? TransactionID { get; set; }
    public string? OrderName { get; set; }
    public List<string>? BookingCodes { get; set; }
    public DateTime? CreateDate { get; set; }
}
