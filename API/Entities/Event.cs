
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using API.Helpers;

namespace API.Entities
{
    public class Event
    {
       
        public Guid Id { get; set; }
        public required string EmployeeName { get; set; }
        public required string EmployeeCode { get; set; }
        public required string Department { get; set; }
        public bool? IsComing{ get; set; } = true;
        public DateTime? CreateDate { get; set; }      
    }
}