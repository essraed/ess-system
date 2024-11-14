namespace API.Helpers
{
    public enum BookingStatus
    {
        Pending,    // جديد
        InProcess, // قيد الاجراء
        Rejected,   // مرفوض
        Finished    // منتهي
    }

    public static class BookingStatusExtensions
    {
        public static string GetString(this BookingStatus status)
        {
            return status switch
            {
                BookingStatus.Pending => "Pending",
                BookingStatus.InProcess => "InProcess",
                // BookingStatus.InProcess => "In Process",
                BookingStatus.Rejected => "Rejected",
                BookingStatus.Finished => "Finished",
                _ => "Unknown"
            };
        }
    }
}
