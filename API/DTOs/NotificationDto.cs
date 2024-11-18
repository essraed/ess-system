
using API.Helpers;

namespace API.DTOs
{
    public class NotificationDto
    {
        public Guid Id { get; set; }
        public required string Title { get; set; }
        public required string Message { get; set; }
        public bool IsRead { get; set; }
        public NotificationType Type { get; set; } // General, Alert, Reminder.
        public string? MoreDetailsUrl { get; set; }
    }
}