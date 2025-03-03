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
                .ForMember(dest => dest.BookingDate, opt =>
                    opt.MapFrom(src =>
                        src.BookingDate.HasValue && !string.IsNullOrEmpty(src.BookingTime)
                            ? src.BookingDate.Value.ToDateTime(TimeOnly.Parse(src.BookingTime)) // Combine date and time
                            : DateTime.Now)) // Default to current date and time if BookingDate is null
                .ForMember(dest => dest.EndBookingDate, opt =>
                    opt.MapFrom(src =>
                        src.EndBookingDate.HasValue && !string.IsNullOrEmpty(src.EndBookingTime)
                            ? src.EndBookingDate.Value.ToDateTime(TimeOnly.Parse(src.EndBookingTime)) // Combine date and time for EndBookingDate
                            : (src.BookingDate.HasValue && !string.IsNullOrEmpty(src.BookingTime)
                                ? src.BookingDate.Value.ToDateTime(TimeOnly.Parse(src.BookingTime)).AddHours(2) // Add 2 hours if no EndBookingDate
                                : DateTime.Now))); // Default to current date and time if both are null



            // Mapping from Booking to BookingDto
            CreateMap<Booking, BookingDto>()
                .ForMember(dest => dest.ServiceName, opt =>
                    opt.MapFrom(src => src.Service!.Name))
                .ForMember(dest => dest.CreatedBy, opt =>
                    opt.MapFrom(src => src.CreatedBy != null ? src.CreatedBy.DisplayName : null))
                .ForMember(dest => dest.UpdatedBy, opt =>
                    opt.MapFrom(src => src.UpdatedBy != null ? src.UpdatedBy.DisplayName : null))
                .ForMember(dest => dest.NationalityName, opt =>
                    opt.MapFrom(src => src.Nationality != null ? src.Nationality.Name : null))
                    .ForMember(dest => dest.PaymentStatus, opt =>
                    opt.MapFrom(src => src.Payment!.Status));

            // Mapping from Booking to BookingDetilasDto
            CreateMap<Booking, BookingDetilasDto>()
                .ForMember(dest => dest.ServiceName, opt =>
                    opt.MapFrom(src => src.Service!.Name))
                .ForMember(dest => dest.ServiceId, opt =>
                    opt.MapFrom(src => src.Service!.Id))
                .ForMember(dest => dest.CreatedBy, opt =>
                    opt.MapFrom(src => src.CreatedBy != null ? src.CreatedBy.DisplayName : null))
                .ForMember(dest => dest.UpdatedBy, opt =>
                    opt.MapFrom(src => src.UpdatedBy != null ? src.UpdatedBy.DisplayName : null))
                .ForMember(dest => dest.ServiceOptionName, opt =>
                    opt.MapFrom(src => src.ServiceOption != null ? src.ServiceOption.Name : null))
                .ForMember(dest => dest.ServiceOptionFee, opt =>
                    opt.MapFrom(src => src.ServiceOption!.AdditionalFee))
                    .ForMember(dest => dest.NationalityName, opt =>
                    opt.MapFrom(src => src.Nationality != null ? src.Nationality.Name : null))
                .ForMember(dest => dest.PaymentStatus, opt =>
                    opt.MapFrom(src => src.Payment!.Status));
                
        }
    }
}
