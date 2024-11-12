using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Helpers
{
    public class TimeHelper
    {
        public static DateTime GetCurrentTimeInAbuDhabi()
    {
        TimeZoneInfo abuDhabiTimeZone = TimeZoneInfo.FindSystemTimeZoneById("Arabian Standard Time");
        
        DateTime abuDhabiTime = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, abuDhabiTimeZone);

        return abuDhabiTime;
    }

    }
}