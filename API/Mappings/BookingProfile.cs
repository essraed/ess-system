using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Mappings
{
    public class BookingProfile : Profile
    {
        public BookingProfile()
        {
            // Mapping for saving a booking
            CreateMap<BookingSaveDto, Booking>()
                .ForMember(dest => dest.BookingDate, opt =>
                    opt.MapFrom(src => src.BookingDate.ToDateTime(TimeOnly.Parse(src.BookingTime))))
                .ForMember(dest => dest.EndBookingDate, opt =>
                    opt.MapFrom(src =>
                        src.EndBookingDate.HasValue && !string.IsNullOrEmpty(src.EndBookingTime)
                            ? src.EndBookingDate.Value.ToDateTime(TimeOnly.Parse(src.EndBookingTime))
                            : src.BookingDate.ToDateTime(TimeOnly.Parse(src.BookingTime)).AddHours(2)));

            // Mapping from Booking to BookingDto
            CreateMap<Booking, BookingDto>()
                .ForMember(dest => dest.ServiceName, opt =>
                    opt.MapFrom(src => src.Service!.Name))
                .ForMember(dest => dest.CreatedBy, opt =>
                    opt.MapFrom(src => src.CreatedBy != null ? src.CreatedBy.DisplayName : null))
                .ForMember(dest => dest.UpdatedBy, opt =>
                    opt.MapFrom(src => src.UpdatedBy != null ? src.UpdatedBy.DisplayName : null));

            // Mapping from Booking to BookingDetilasDto
            CreateMap<Booking, BookingDetilasDto>()
                .ForMember(dest => dest.ServiceName, opt =>
                    opt.MapFrom(src => src.Service!.Name))
                .ForMember(dest => dest.CreatedBy, opt =>
                    opt.MapFrom(src => src.CreatedBy != null ? src.CreatedBy.DisplayName : null))
                .ForMember(dest => dest.UpdatedBy, opt =>
                    opt.MapFrom(src => src.UpdatedBy != null ? src.UpdatedBy.DisplayName : null));
        }
    }
}
