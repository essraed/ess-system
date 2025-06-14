using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Helpers;

namespace API.Entities
{
    public class Complaint
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public required string Phone { get; set; }
        public required string Email { get; set; }
        public required string Comments { get; set; }
        public required string Department { get; set; }
        public string? Remarks { get; set; }
        public required ComplaintStatus Status { get; set; } = ComplaintStatus.Pending;
        public bool IsComplaint { get; set; } = true;
        public bool IsDeleted { get; set; } = false;
        public DateTime? CreateDate { get; set; }
        public DateTime? UpdateDate { get; set; }
        public string? CreatedById { get; set; }
        public AppUser? CreatedBy { get; set; }
        public string? UpdatedById { get; set; }
        public AppUser? UpdatedBy { get; set; }
    }
}