using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Helpers;

namespace API.DTOs.LostDto
{
    public class LostDto
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public required string Phone { get; set; }
        public required string Email { get; set; }
        public required string LostDepartment { get; set; }
        public required string Comments { get; set; }
        public string? Remarks { get; set; }
        public required DateTime LostDate { get; set; }
        public required LostStatus Status { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? UpdateDate { get; set; }
        public string? CreatedBy { get; set; }
        public string? UpdatedBy { get; set; }
        public ICollection<FileResponseDto>? FileEntities { get; set; }
    }
}