using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.Clients
{
    public class ClientSaveDto
    {
        public required string Name { get; set; }
        public required string PassportNumber { get; set; }
        public Guid? BookingId { get; set; }
    }
}