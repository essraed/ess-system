
using API.Data;
using API.DTOs.ContactDto;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using API.RequestParams;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
    public class ContactService : IContactService
    {
        private readonly DataContext _context;
        private readonly IEmailService _emailService;
        private readonly IMapper _mapper;

        public ContactService(DataContext context, IMapper mapper, IEmailService emailService)
        {
            _emailService = emailService;
            _context = context;
            _mapper = mapper;
        }

        public async Task<PagedList<ContactDto>> GetAllContactsAsync(ContactParams contactParams)
        {
            var query = _context.Contacts
                .Where(x => !x.IsDeleted)
                .AsNoTracking()
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(contactParams.SearchTerm))
            {
                var searchTerm = contactParams.SearchTerm.Trim().ToLower();
                query = query.Where(x => x.Name.ToLower().Contains(searchTerm) ||
                                         x.Phone.ToLower().Contains(searchTerm) ||
                                         (!string.IsNullOrEmpty(x.Email) && x.Email.ToLower().Contains(searchTerm)));
            }

            if (contactParams.From != null)
            {
                query = query.Where(x => x.CreateDate >= contactParams.From);
            }

            if (contactParams.To != null)
            {
                var toDate = contactParams.To.Value.AddDays(1);
                query = query.Where(x => x.CreateDate <= toDate);
            }
            return await PagedList<ContactDto>.CreateAsync(
                query.ProjectTo<ContactDto>(_mapper.ConfigurationProvider),
                contactParams.PageNumber,
                contactParams.PageSize);
        }

        public async Task<ContactDto> GetContactByIdAsync(Guid id)
        {
            var contact = await _context.Contacts.FindAsync(id);
            if (contact == null || contact.IsDeleted)
            {
                throw new KeyNotFoundException($"Contact with id {id} not found.");
            }

            return _mapper.Map<ContactDto>(contact);
        }

        public async Task<ContactDto> AddContactAsync(ContactSaveDto model)
        {
            var contact = _mapper.Map<Contact>(model);
            contact.CreateDate = TimeHelper.GetCurrentTimeInAbuDhabi();

            _context.Contacts.Add(contact);
            var result = await _context.SaveChangesAsync() > 0;

            if (!result)
                throw new Exception("An error occured during saving contact.");

            // send mail to manager
            // await _emailService.SendEmailAsync("raf-se@hotmail.com", model.Subject, model.Message);

            return _mapper.Map<ContactDto>(contact);
        }

        public async Task DeleteContactAsync(Guid id)
        {
            var contact = await _context.Contacts.FindAsync(id);

            if (contact == null || contact.IsDeleted)
            {
                throw new KeyNotFoundException($"Contact with id {id} not found.");
            }

            contact.IsDeleted = true;
            var result = await _context.SaveChangesAsync() > 0;

            if (!result)
            {
                throw new Exception("Failed to delete the contact.");
            }
        }
    }
}
