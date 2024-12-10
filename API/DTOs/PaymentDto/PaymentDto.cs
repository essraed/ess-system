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
    public string? CustomerName { get; set; }
    public string? CustomerEmail { get; set; }
    public string? CustomerPhone { get; set; }
    public string? OrderId { get; set; }
    public string? OrderName { get; set; }

    public string? BookingCode { get; set; }

    public DateTime? CreateDate { get; set; }
}
