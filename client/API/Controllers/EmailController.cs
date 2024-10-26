using API.DTOs;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmailController : ControllerBase
    {
        private readonly EmailService _emailService;

        public EmailController(EmailService emailService)
        {
            _emailService = emailService;
        }

        [AllowAnonymous]
        [HttpPost("send")]
        public async Task<IActionResult> SendEmail([FromForm] MailDto model)
        {
            var result = await _emailService.SendEmailAsync(model);
            if (!result)
            {
                return StatusCode(500, "Failed to send email.");
            }
            return Ok("Email sent successfully");
        }

        [AllowAnonymous]
        [HttpGet("resend/{id}")]
        public async Task<IActionResult> ReSendEmail(Guid id)
        {
            var result = await _emailService.ResendEmailAsync(id);
            if (!result)
            {
                return StatusCode(500, "Mail not found.");
            }
            
            return Ok("Email resent successfully");
        }
    }
}
