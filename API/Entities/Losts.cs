using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Helpers;

namespace API.Entities
{
    public class Lost
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public required string Phone { get; set; }
        public required string Email { get; set; }
        public required string Comments { get; set; }
        public string? Remarks { get; set; }
        public required string LostDepartment { get; set; }
        public required LostStatus Status { get; set; } = LostStatus.Pending;
        public bool IsDeleted { get; set; } = false;
        public required DateTime LostDate { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? UpdateDate { get; set; }
        public string? CreatedById { get; set; }
        public AppUser? CreatedBy { get; set; }
        public string? UpdatedById { get; set; }
        public AppUser? UpdatedBy { get; set; }
    }
}