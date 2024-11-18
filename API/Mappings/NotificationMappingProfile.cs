
using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Mappings
{
    public class NotificationMappingProfile : Profile
    {
        public NotificationMappingProfile()
        {
            CreateMap<Notification, NotificationDto>();
        }
    }
}