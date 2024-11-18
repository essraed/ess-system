using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Mappings
{
    public class BookingProfile : Profile
    {
        public BookingProfile()
        {
            CreateMap<BookingSaveDto, Booking>()
               // Convert DateOnly to DateTime (with TimeOnly for time)
               .ForMember(dest => dest.BookingDate, opt =>
                   opt.MapFrom(src => src.BookingDate.ToDateTime(TimeOnly.Parse(src.BookingTime))))

               // Handle nullable EndBookingDate, convert to DateTime if available
               .ForMember(dest => dest.EndBookingDate, opt =>
                   opt.MapFrom(src =>
                       src.EndBookingDate.HasValue && !string.IsNullOrEmpty(src.EndBookingTime)
                           ? src.EndBookingDate.Value.ToDateTime(TimeOnly.Parse(src.EndBookingTime))
                           : src.BookingDate.ToDateTime(TimeOnly.Parse(src.BookingTime)).AddHours(2)));

            // Mapping Booking to BookingDto
            CreateMap<Booking, BookingDto>()
                .ForMember(dest => dest.ServiceName, opt =>
                    opt.MapFrom(src => src.Service!.Name));
        }
    }
}
