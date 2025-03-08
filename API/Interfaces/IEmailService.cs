namespace API.Interfaces
{
    public interface IEmailService
    {
        Task<bool> SendEmailAsync(string toEmail, string subject, string body);
        Task<bool> SendEmailWithAttachmentsAsync(string toEmail, string subject, string body, List<string> filePaths);

    }
}