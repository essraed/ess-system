using API.DTOs.ContactDto;
using API.Helpers;
using API.Interfaces;
using API.RequestParams;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        private readonly IContactService _contactService;

        public ContactsController(IContactService contactService)
        {
            _contactService = contactService;
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<ContactDto>>> GetAllContacts([FromQuery] ContactParams contactParams)
        {
            var contacts = await _contactService.GetAllContactsAsync(contactParams);
            return Ok(contacts);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ContactDto>> GetContactById(Guid id)
        {
            try
            {
                var contact = await _contactService.GetContactByIdAsync(id);
                return Ok(contact);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult<ContactDto>> AddContact(ContactSaveDto model)
        {
            try
            {
                var contact = await _contactService.AddContactAsync(model);
                return CreatedAtAction(nameof(GetContactById), new { id = contact.Id }, contact);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContact(Guid id)
        {
            try
            {
                await _contactService.DeleteContactAsync(id);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
