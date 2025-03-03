using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Helpers;

namespace API.DTOs.Clients
{
    public class ClientDto
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public required string PassportNumber { get; set; }
        public required ClientStatus Status { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? UpdateDate { get; set; }
        public string? CreatedBy { get; set; }
        public string? UpdatedBy { get; set; }
        public string? BookingCode { get; set; }
        public ICollection<FileResponseDto>? FileEntities { get; set; }
    }
}