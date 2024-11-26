using API.Interfaces;
using MailKit.Net.Smtp;
using MimeKit;

namespace API.Services
{
    public class EmailService : IEmailService
    {
        // SMTP
        private readonly string _smtpServer = "smtp.gmail.com";
        private readonly int _smtpPort = 465;
        private readonly string _smtpUsername = "raed.ali.alfarhan@gmail.com";
        private readonly string _smtpPassword = "bfxvsucywkfrzoqw";

        public async Task<bool> SendEmailAsync(string toEmail, string subject,  string body)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("Raed Alfarhan", _smtpUsername));
            message.To.Add(new MailboxAddress("", toEmail));
            message.Subject = subject;

            var bodyBuilder = new BodyBuilder
            {
                TextBody = body
            };

            message.Body = bodyBuilder.ToMessageBody();

            bool emailSent = await SendEmailAsync(message);

            if (!emailSent)
            {
                throw new Exception("Mail failed sending.");
            }

            return emailSent;
        }

        private async Task<bool> SendEmailAsync(MimeMessage message)
        {
            using (var smtpClient = new SmtpClient())
            {
                try
                {
                    await smtpClient.ConnectAsync(_smtpServer, _smtpPort, MailKit.Security.SecureSocketOptions.SslOnConnect);
                    await smtpClient.AuthenticateAsync(_smtpUsername, _smtpPassword);
                    await smtpClient.SendAsync(message);
                    return true;
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error sending email: {ex.Message}");
                    return false;
                }
                finally
                {
                    await smtpClient.DisconnectAsync(true);
                }
            }
        }
    }
}
