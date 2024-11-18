
using API.Helpers;

namespace API.Entities
{
    public class Notification
    {
        public Guid Id { get; set; }
        public required string Title { get; set; }
        public required string Message { get; set; }
        public bool IsRead { get; set; }
        public NotificationType Type { get; set; } // General, Alert, Reminder.
        public string? MoreDetailsUrl { get; set; }

        // related tables
        public DateTime? CreateDate { get; set; }
        public DateTime? UpdateDate { get; set; }

        public string? CreatedById { get; set; }
        public AppUser? CreatedBy { get; set; }

        public string? UpdatedById { get; set; }
        public AppUser? UpdatedBy { get; set; }
    }
}