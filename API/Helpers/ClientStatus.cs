using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Helpers
{
    public enum ClientStatus
    {
        Pending,    // New
        InProcess, // After payment will change to in process.
        Accepted,
        Rejected    // Done
    }
}