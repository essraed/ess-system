using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.LostDto
{
    public class LostSaveDto
    {
        public required string Name { get; set; }
        public required string Phone { get; set; }
        public required string Email { get; set; }
        public required string LostDepartment { get; set; }
        public required string Comments { get; set; }
        public required DateTime LostDate { get; set; }
    }
}