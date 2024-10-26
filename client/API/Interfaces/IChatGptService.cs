using API.DTOs;

namespace API.Interfaces
{
    public interface IChatGptService
    {
        Task<string> GetResponseFromChatGpt(UserPromptDto userPrompt);
    }
}