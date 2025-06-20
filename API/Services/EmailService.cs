using API.Interfaces;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;

namespace API.Services
{
    public class EmailService : IEmailService
    {
   private readonly string _smtpServer = "mail.ess.ae";
private readonly int _smtpPort = 587;
private readonly string _smtpUsername = "notification@ess.ae";
private readonly string _smtpPassword = "notification@123";

        public async Task<bool> SendEmailAsync(string toEmail, string subject, string body)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("Notification From Karama Business Center", _smtpUsername));
            message.To.Add(MailboxAddress.Parse(toEmail));
            message.Subject = subject;

            var bodyBuilder = new BodyBuilder
            {
                HtmlBody = body
            };

            message.Body = bodyBuilder.ToMessageBody();

            return await SendEmailInternalAsync(message);
        }

        public async Task<bool> SendEmailWithAttachmentsAsync(string toEmail, string subject, string body, List<string> filePaths)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("Notification From Karama Business Center", _smtpUsername));
            message.To.Add(MailboxAddress.Parse(toEmail));
            message.Subject = subject;

            var bodyBuilder = new BodyBuilder
            {
                HtmlBody = body
            };

            foreach (var filePath in filePaths)
            {
                if (File.Exists(filePath))
                    bodyBuilder.Attachments.Add(filePath);
            }

            message.Body = bodyBuilder.ToMessageBody();

            return await SendEmailInternalAsync(message);
        }

        private async Task<bool> SendEmailInternalAsync(MimeMessage message)
        {
            using var smtpClient = new SmtpClient();
            try
            {
                await smtpClient.ConnectAsync("mail.ess.ae", 587, SecureSocketOptions.StartTls);
                await smtpClient.AuthenticateAsync("notification@ess.ae", "notification@123");

                // await smtpClient.ConnectAsync(_smtpServer, _smtpPort, SecureSocketOptions.SslOnConnect);
                // await smtpClient.AuthenticateAsync(_smtpUsername, _smtpPassword);
                await smtpClient.SendAsync(message);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ Error sending email: {ex.Message}");
                return false;
            }
            finally
            {
                await smtpClient.DisconnectAsync(true);
            }
        }
    }
}
