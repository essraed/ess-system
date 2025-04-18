using API.DTOs;
using API.Helpers;
using API.RequestParams;

namespace API.Interfaces
{
    public interface INotificationService
    {
        Task<PagedList<NotificationDto>> GetAll(NotificationParams param);
        Task SendNotification(string message, string title, NotificationType type, string? url, DateTime? endNotificationTime);
        Task<bool> NotificationStatusToggle(Guid id);

        Task<bool> DeleteNotificationAsync(Guid id);
    }
}