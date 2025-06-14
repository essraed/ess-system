using API.Interfaces;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;

namespace API.Services
{
    public class EmailService : IEmailService
    {
        // SMTP
        // private readonly string _smtpServer = "mail.kbc.center";
        // private readonly int _smtpPort = 465;
        // private readonly string _smtpUsername = "booking@kbc.center";
        // private readonly string _smtpPassword = "booking@224";

         private readonly string _smtpServer = "ess.ae";
        private readonly int _smtpPort = 587;
        private readonly string _smtpUsername = "notifications@ess.ae";
        private readonly string _smtpPassword = "notifications@123";

        public async Task<bool> SendEmailAsync(string toEmail, string subject, string body)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("Notification From Karama Business Center", _smtpUsername));
            message.To.Add(new MailboxAddress("", toEmail));
            message.Subject = subject;

            // Setting the body to HTML content
            var bodyBuilder = new BodyBuilder
            {
                HtmlBody = body
            };

            message.Body = bodyBuilder.ToMessageBody();

            bool emailSent = await SendEmailAsync(message);

            if (!emailSent)
            {
                throw new Exception("Mail failed sending.");
            }

            return emailSent;
        }


        public async Task<bool> SendEmailWithAttachmentsAsync(string toEmail, string subject, string body, List<string> filePaths)
        {
            try
            {
                // Create the MimeMessage object
                var message = new MimeMessage();
                message.From.Add(new MailboxAddress("Notification From Karama Business Center", _smtpUsername));
                message.To.Add(new MailboxAddress("", toEmail));
                message.Subject = subject;

                // Create a BodyBuilder for the email body
                var bodyBuilder = new BodyBuilder
                {
                    HtmlBody = body // Use the body as HTML content
                };

                // Attach files to the email
                foreach (var filePath in filePaths)
                {
                    bodyBuilder.Attachments.Add(filePath);
                }

                // Set the body of the message to the BodyBuilder content
                message.Body = bodyBuilder.ToMessageBody();

                // Send the email using your SMTP client (e.g., MailKit)
                bool emailSent = await SendEmailAsync(message);

                if (!emailSent)
                {
                    throw new Exception("Mail failed sending.");
                }

                return emailSent;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error sending email with attachments: {ex.Message}");
                return false;
            }
        }


        private async Task<bool> SendEmailAsync(MimeMessage message)
        {
            using (var smtpClient = new SmtpClient())
            {
                try
                {
                    await smtpClient.ConnectAsync(_smtpServer, _smtpPort, SecureSocketOptions.StartTls);
                    await smtpClient.AuthenticateAsync(_smtpUsername, _smtpPassword);


                    var formatedMessage = $@"
                        <!DOCTYPE html>
                        <html lang='en'>
                        <head>
                            <meta charset='UTF-8'>
                            <meta name='viewport' content='width=device-width, initial-scale=1.0'>
                            <title>Responsive Email Template</title>
                            <style>
                                @media screen and (max-width: 600px) {{
                                    .content {{
                                        width: 100% !important;
                                        display: block !important;
                                        padding: 10px !important;
                                    }}
                                    .header, .body, .footer {{
                                        padding: 20px !important;
                                    }}
                                }}
                            </style>
                        </head>
                        <body style='font-family: Poppins, Arial, sans-serif; margin: 0; padding: 0;'>
                            {message}
                        </body> 
                        </html>";


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
