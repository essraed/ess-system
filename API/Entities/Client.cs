    using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Helpers;

namespace API.Entities
{
    public class Client
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public required string PassportNumber { get; set; }
        public required ClientStatus Status { get; set; } = ClientStatus.Pending;
        public bool IsDeleted { get; set; } = false;
        public DateTime? CreateDate { get; set; }
        public DateTime? UpdateDate { get; set; }
        public string? CreatedById { get; set; }
        public AppUser? CreatedBy { get; set; }
        public string? UpdatedById { get; set; }
        public AppUser? UpdatedBy { get; set; }
        public Guid? BookingId { get; set; }
        public Booking? Booking { get; set; }
        public ICollection<FileEntity>? FileEntities { get; set; }
    }
}