using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class BookingSaveDto
    {
        public DateTime? BookingDate { get; set; }
        public Guid? CarId { get; set; }
    }
}