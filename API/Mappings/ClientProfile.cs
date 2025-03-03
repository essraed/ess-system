using API.DTOs;
using API.DTOs.Clients;
using API.DTOs.ContactDto;
using API.DTOs.LostDto;
using API.Entities;
using AutoMapper;

namespace API.Mappings
{
    public class ClientProfile : Profile
    {
        public ClientProfile()
        {
            CreateMap<Client, ClientDto>()
             .ForMember(dest => dest.CreatedBy, opt =>
                    opt.MapFrom(src => src.CreatedBy != null ? src.CreatedBy.DisplayName : null))
                .ForMember(dest => dest.UpdatedBy, opt =>
                    opt.MapFrom(src => src.UpdatedBy != null ? src.UpdatedBy.DisplayName : null))
                .ForMember(dest => dest.BookingCode, opt =>
                    opt.MapFrom(src => src.Booking != null ? src.Booking.BookingCode : null));
            CreateMap<ClientSaveDto, Client>();
        }
    }
}
