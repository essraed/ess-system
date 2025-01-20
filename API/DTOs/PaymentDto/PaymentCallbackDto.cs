using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.PaymentDto
{
    public class PaymentCallbackDto
    {
        public Transaction? Transaction { get; set; }
    }

    public class Transaction
    {
        public string? ResponseCode { get; set; }
        public string? ResponseClass { get; set; }
        public string? ResponseDescription { get; set; }
        public string? ResponseClassDescription { get; set; }
        public string? Language { get; set; }
        public string? TransactionID { get; set; }
        public string? ApprovalCode { get; set; }
        public string? Account { get; set; }
        public Balance? Balance { get; set; }
        public string? OrderID { get; set; }
        public Amount? Amount { get; set; }
        public Fees? Fees { get; set; }
        public string? CardNumber { get; set; }
        public PayerDetails? Payer { get; set; }
        public string? CardToken { get; set; }
        public string? CardBrand { get; set; }
        public string? CardType { get; set; }
        public string? IsCaptured { get; set; }
        public string? CaptureID { get; set; }
        public string? UniqueID { get; set; }
    }

    public class PayerDetails
    {
        public string? Information { get; set; }
    }
    public class Balance
    {
        public string? Value { get; set; }
        public string? Printable { get; set; }
    }

    public class Amount
    {
        public string? Value { get; set; }
        public string? Printable { get; set; }
    }

    public class Fees
    {
        public string? Value { get; set; }
        public string? Printable { get; set; }

    }



    public class FinalizationRequest
    {
        public Finalization Finalization { get; set; }
    }

    public class Finalization
    {
        public string Customer { get; set; }
        public string TransactionID { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
    }

}