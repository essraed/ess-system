using System.Security.Claims;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Hubs;
using API.Interfaces;
using API.RequestParams;
using AutoMapper;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
    public class NotificationService : INotificationService
    {
        private readonly IHubContext<NotificationHub> _hubContext;
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public NotificationService(DataContext context, IHubContext<NotificationHub> hubContext,
            IMapper mapper, IHttpContextAccessor httpContextAccessor)
        {
            _mapper = mapper;
            _context = context;
            _hubContext = hubContext;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<List<NotificationDto>> GetAll(NotificationParams param)
        {
            var query = _context.Notifications
                    .OrderBy(x => x.UpdateDate.HasValue ? x.UpdateDate : x.CreateDate)
                    .AsQueryable();

            if (param.IsRead != null)
            {
                query = query.Where(x => x.IsRead == param.IsRead);

                // end notification
                if (param.IsRead == false) {
                    var currentTime = TimeHelper.GetCurrentTimeInAbuDhabi();

                    query = query.Where(x => !x.EndNotificationDate.HasValue || (x.EndNotificationDate >= currentTime));

                    query = query.Where(x => !x.UpdateDate.HasValue);
                }
            }

            if (param.Count != null && param.Count > 0)
            {
                query = query.Take(param.Count ?? 0);
            }

            return _mapper.Map<List<NotificationDto>>(await query.ToListAsync());
        }

        public async Task SendNotification(string message, string title, NotificationType type, string? url, DateTime? endNotificationTime)
        {
            var notification = new Notification
            {
                Title = title,
                Message = message,
                Type = type,
                MoreDetailsUrl = url,
                CreateDate = TimeHelper.GetCurrentTimeInAbuDhabi(),
                CreatedById = GetCurrentUserId(),
                EndNotificationDate = endNotificationTime,
            };

            _context.Notifications.Add(notification);

            await _context.SaveChangesAsync();

            await _hubContext.Clients.All
                .SendAsync("ReceiveNotification", notification.Id, title, message, type, url);
        }

        public async Task<bool> NotificationStatusToggle(Guid id)
        {
            var notification = await _context.Notifications.FindAsync(id);
            if (notification != null)
            {
                notification.IsRead = !notification.IsRead;
                notification.UpdateDate = TimeHelper.GetCurrentTimeInAbuDhabi();

                var result = await _context.SaveChangesAsync() > 0;

                return result;
            }
            throw new Exception("Error occured during mark notification 'read'.");
        }

        private string GetCurrentUserId()
        {
            return _httpContextAccessor
                .HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value
                    ?? null!;
        }
    }
}