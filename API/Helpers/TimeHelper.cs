namespace API.Helpers
{
    public class TimeHelper
    {
        public static DateTime GetCurrentTimeInAbuDhabi(DateTime? dateTime = null)
        {
            DateTime utcTime = dateTime ?? DateTime.UtcNow;

            TimeZoneInfo abuDhabiTimeZone = TimeZoneInfo.FindSystemTimeZoneById("Arabian Standard Time");
            return TimeZoneInfo.ConvertTimeFromUtc(utcTime, abuDhabiTimeZone);
        }


    }
}