using API.DTOs;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChatGptController : ControllerBase
    {
        private readonly IChatGptService _chatGptService;

        public ChatGptController(IChatGptService chatGptService)
        {
            _chatGptService = chatGptService;
        }

        [AllowAnonymous]
        [HttpPost("generate-summary")]
        public async Task<IActionResult> GenerateSummary([FromBody] UserPromptDto prompt)
        {
            var response = await _chatGptService.GetResponseFromChatGpt(prompt);
            
            return Ok(response);
        }
    }
}
