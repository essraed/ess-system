
using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Mappings
{
    public class PaymentProfile : Profile
    {
        public PaymentProfile()
        {
            CreateMap<PaymentSaveDto, Payment>();
            CreateMap<Payment, PaymentDto>()
            .ForMember(dest => dest.BookingCode, opt =>
                    opt.MapFrom(src => src.Booking.BookingCode));;
        }
    }
}