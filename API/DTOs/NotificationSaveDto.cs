
using API.Helpers;

namespace API.DTOs
{
    public class NotificationSaveDto
    {
 
        public required string Title { get; set; }
        public required string Message { get; set; }
        public NotificationType Type { get; set; } // General, Alert, Reminder.
        public string? MoreDetailsUrl { get; set; }
    }
}