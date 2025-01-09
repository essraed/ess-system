using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.PaymentDto
{
    public class PaymentCallbackDto
{
    public Transaction Transaction { get; set; }
}

public class Transaction
{
    public string PaymentPortal { get; set; }
    public string PaymentPage { get; set; }
    public string ResponseCode { get; set; }
    public string ResponseClass { get; set; }
    public string ResponseDescription { get; set; }
    public string ResponseClassDescription { get; set; }
    public string TransactionID { get; set; }
    public Balance Balance { get; set; }
    public Amount Amount { get; set; }
    public Fees Fees { get; set; }
    public string UniqueID { get; set; }
}

public class Balance
{
    public string Value { get; set; }
}

public class Amount
{
    public string Value { get; set; }
}

public class Fees
{
    public string Value { get; set; }
}

}