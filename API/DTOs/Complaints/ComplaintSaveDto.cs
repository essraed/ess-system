using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.LostDto
{
    public class ComplaintSaveDto
    {
        public required string Name { get; set; }
        public required string Phone { get; set; }
        public required string Email { get; set; }
        public required string Department { get; set; }
        public bool IsComplaint { get; set; }
        public required string Comments { get; set; }
    }
}