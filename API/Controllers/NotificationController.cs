using API.Helpers;
using API.Interfaces;
using API.RequestParams;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class NotificationController : ControllerBase
    {
        private readonly INotificationService _notificatioService;

        public NotificationController(INotificationService notificationService)
        {
            _notificatioService = notificationService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllNotification([FromQuery] NotificationParams param)
        {
            return Ok(await _notificatioService.GetAll(param));
        }


        [HttpPost("send")]
        public async Task<IActionResult> SendNotification(string Message, string Title, NotificationType Type, string? Url, DateTime? endNotificationTime)
        {
            await _notificatioService.SendNotification(Title, Message, Type, Url, endNotificationTime);

            return Ok("Notification sent successfully");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> NotificationStatusToggle(Guid id)
        {
            var result = await _notificatioService.NotificationStatusToggle(id);

            if (result)
            {
                return Ok("Notification marked as read successfuly");
            }

            return BadRequest("Failed to mark the notification as 'read'.");
        }
    }
}