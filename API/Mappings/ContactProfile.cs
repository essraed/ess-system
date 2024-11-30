using API.DTOs;
using API.DTOs.ContactDto;
using API.Entities;
using AutoMapper;

namespace API.Mappings
{
    public class ContactProfile : Profile
    {
        public ContactProfile()
        {
            CreateMap<Contact, ContactDto>();
            CreateMap<ContactSaveDto, Contact>();
        }
    }
}
