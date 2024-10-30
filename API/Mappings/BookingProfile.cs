using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Mappings
{
    public class BookingProfile : Profile
    {
        public BookingProfile()
        {
            CreateMap<BookingSaveDto, Booking>();
        }
    }
}
