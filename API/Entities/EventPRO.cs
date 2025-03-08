
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using API.Helpers;

namespace API.Entities
{
    public class EventPRO
    {
       
        public Guid Id { get; set; }
        public required string PROName { get; set; }
        public required string PROCode { get; set; }
        public string? Email { get; set; }
        public bool IsComing{ get; set; } = true;
        public DateTime? CreateDate { get; set; }   
 
    }
}