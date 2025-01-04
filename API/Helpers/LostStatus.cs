using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Helpers
{
    public enum LostStatus
    {
         Pending,    // New
        InProcess, // After payment will change to in process.
        Completed    // Done
    }
}