namespace API.Helpers
{
    public enum BookingStatus
    {
        New,        // جديد
        Rejected,   // مرفوض
        Finished    // منتهي
    }

    public static class BookingStatusExtensions
    {
        public static string GetString(this BookingStatus status)
        {
            return status switch
            {
                BookingStatus.New => "New",
                // BookingStatus.InProcess => "In Process",
                BookingStatus.Rejected => "Rejected",
                BookingStatus.Finished => "Finished",
                _ => "Unknown"
            };
        }
    }
}
