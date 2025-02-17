
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
            if (contactParams.enquiryType != "null")
            {
                bool enquiryType = contactParams.enquiryType == "true" ? true : false;
                query = query.Where(x => x.EnquiryType == enquiryType);
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

            // string subject = "For Contact";
            // if (model.EnquiryType)
            // {
            //     subject = "For Business";
            // }

            // Map the incoming data to the Contact entity
            var contact = _mapper.Map<Contact>(model);
            contact.CreateDate = TimeHelper.GetCurrentTimeInAbuDhabi();

            // Add the contact to the database and save
            _context.Contacts.Add(contact);
            var result = await _context.SaveChangesAsync() > 0;

            if (!result)
                throw new Exception("An error occurred during saving the contact.");

            // Send email to the manager (or coordinator)
            string coordinatorSubject = $"{(model.EnquiryType ? "Business" : "General")} Enquiry Submission";
            string coordinatorBody = $@"
                <p>Dear Admin,</p>
                <p>A new {(model.EnquiryType ? "business enquiry" : "contact form submission")} has been received. Please review the details below:</p>
                <h3>{(model.EnquiryType ? "Business Enquiry" : "Contact Submission")} Details</h3>
                <p>
                    <strong>Customer Name:</strong> {contact.Name}<br/>
                    <strong>Email:</strong> {contact.Email}<br/>
                    <strong>Date Submitted:</strong> {contact.CreateDate:dd-MM-yyyy hh:mm tt}<br/>
                    <strong>Message:</strong> {contact.Message}<br/>
                </p>
                <p>Please review and respond accordingly.</p>
                <p>Best regards,<br/>KBC Notification System</p>";

            await _emailService.SendEmailAsync("raf-se@hotmail.com", coordinatorSubject, coordinatorBody);

            // Send email to the customer
            string customerSubject = model.EnquiryType ? "Thank you for your business enquiry" : "Thank you for contacting us";
            string customerBody = $@"
                <p>Dear {contact.Name},</p>
                <p>Thank you for reaching out to us. We have received your {(model.EnquiryType ? "business enquiry" : "contact message")} and will get back to you as soon as possible.</p>
                <p>Here are the details of your submission:</p>
                <p>
                    <strong>Message:</strong> {contact.Message}<br/>
                    <strong>Date Submitted:</strong> {contact.CreateDate:dd-MM-yyyy hh:mm tt}<br/>
                </p>
                <p>We will be in touch shortly.</p>
                <p>Best regards,<br/>The [Your Company] Team</p>";

            await _emailService.SendEmailAsync(contact.Email, customerSubject, customerBody);

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
