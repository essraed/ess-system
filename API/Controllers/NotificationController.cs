using API.Helpers;
using API.RequestParams;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class NotificationController : ControllerBase
    {
        private readonly NotificationService _notificatioService;

        public NotificationController(NotificationService notificationService)
        {
            _notificatioService = notificationService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllNotification([FromQuery] NotificationParams param)
        {
            return Ok(await _notificatioService.GetAll(param));
        }


        [HttpPost("send")]
        public async Task<IActionResult> SendNotification(string Message, string Title, NotificationType Type, string? Url)
        {
            await _notificatioService.SendNotification(Title, Message, Type, Url);

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