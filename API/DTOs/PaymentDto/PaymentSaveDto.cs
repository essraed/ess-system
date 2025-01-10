using System.ComponentModel.DataAnnotations;

public class PaymentSaveDto
{
    public decimal TransactionAmount { get; set; }
    public string? OrderName { get; set; }
}
