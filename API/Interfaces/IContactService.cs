using API.DTOs.ContactDto;
using API.Helpers;
using API.RequestParams;

namespace API.Interfaces
{
    public interface IContactService
    {
        Task<PagedList<ContactDto>> GetAllContactsAsync(ContactParams contactParams);
        Task<ContactDto> GetContactByIdAsync(Guid id);
        Task<ContactDto> AddContactAsync(ContactSaveDto model);
        Task DeleteContactAsync(Guid id);
    }
}
