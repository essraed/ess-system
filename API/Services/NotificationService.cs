using System.Security.Claims;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Hubs;
using API.RequestParams;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
    public class NotificationService
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

        public async Task<PagedList<NotificationDto>> GetAll(NotificationParams param)
        {
            var query = _context.Notifications
                    .OrderBy(x => x.UpdateDate.HasValue ? x.UpdateDate : x.CreateDate)
                    .AsNoTracking()
                    .AsQueryable();

            if (param.IsRead != null)
            {
                query = query.Where(x => x.IsRead == param.IsRead);
            }

            if (param.Count != null && param.Count > 0)
            {
                query = query.Take(param.Count ?? 0);
            }


            if (param.From != null)
            {
                query = query.Where(x =>
                    (x.UpdateDate ?? x.CreateDate) >= param.From);
            }

            if (param.To != null)
            {
                var toDate = param.To.Value.AddDays(1);
                query = query.Where(x =>
                    (x.UpdateDate ?? x.CreateDate) <= toDate);
            }


            return await PagedList<NotificationDto>.CreateAsync(
             query.ProjectTo<NotificationDto>(_mapper.ConfigurationProvider),
             param.PageNumber,
             param.PageSize);
        }

        public async Task SendNotification(string message, string title, NotificationType type, string? url)
        {
            var notification = new Notification
            {
                Title = title,
                Message = message,
                Type = type,
                MoreDetailsUrl = url,
                CreateDate = TimeHelper.GetCurrentTimeInAbuDhabi(),
                CreatedById = GetCurrentUserId(),
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