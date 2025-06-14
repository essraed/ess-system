public class CreatePaymentIntentDto
{
    public long Amount { get; set; } // in cents
    public string? Currency { get; set; }
    public string? OrderName { get; set; }
    public string? OrderID { get; set; }
}