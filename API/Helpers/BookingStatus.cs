namespace API.Helpers
{
    public enum BookingStatus
    {
        Pending,    // New
        InProcess, // After payment will change to in process.
        Canceled,   // Cancell
        Completed    // Done
    }

    public static class BookingStatusExtensions
    {
        public static string GetString(this BookingStatus status)
        {
            return status switch
            {
                BookingStatus.Pending => "Pending",
                BookingStatus.InProcess => "InProcess",
                BookingStatus.Canceled => "Canceled",
                BookingStatus.Completed => "Completed",
                _ => "Unknown"
            };
        }
    }
}
