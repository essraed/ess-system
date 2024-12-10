using System.ComponentModel.DataAnnotations;

public class PaymentSaveDto
{
    public decimal TransactionAmount { get; set; }

    public string? CustomerName { get; set; }

    public string? CustomerEmail { get; set; }
    public string? CustomerPhone { get; set; }

    public string? OrderName { get; set; }

    public Guid OrderId { get; set; }
}
