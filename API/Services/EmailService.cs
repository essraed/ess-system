using System.Security.Claims;
using API.Data;
using API.DTOs;
using API.Entities;
using MailKit.Net.Smtp;
using MimeKit;

namespace API.Services
{
    public class EmailService
    {
        private readonly FileService _fileService;
        private readonly IWebHostEnvironment _environment;
        private readonly string _uploadPath;
        private readonly string _directory = "mails";
        private readonly DataContext _context;

        // SMTP
        private readonly string _smtpServer = "smtp.gmail.com";
        private readonly int _smtpPort = 465;
        private readonly string _smtpUsername = "raed.ali.alfarhan@gmail.com";
        private readonly string _smtpPassword = "bfxvsucywkfrzoqw";
        private readonly IHttpContextAccessor _httpContextAccessor;

        public EmailService(FileService fileService, DataContext context,
            IWebHostEnvironment environment, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _fileService = fileService;
            _environment = environment;
            _httpContextAccessor = httpContextAccessor;
            _uploadPath = Path.Combine(_environment.WebRootPath, _directory);
        }

        public async Task<bool> SendEmailAsync(MailDto model)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("Raed Alfarhan", _smtpUsername));
            message.To.Add(new MailboxAddress("", model.ToEmail));
            message.Subject = model.Subject;

            var bodyBuilder = new BodyBuilder
            {
                TextBody = model.Body
            };

            List<string> filePaths = null!;


            // no need to store files into file sytem.
            if (model.FormFiles != null && model.FormFiles.Any())
            {
                filePaths = await _fileService.SaveFilesAsync(model.FormFiles, _directory);
                AttachFilesToEmail(bodyBuilder, filePaths);
            }

            message.Body = bodyBuilder.ToMessageBody();

            bool emailSent = await SendEmailAsync(message);

            if (emailSent)
            {
                var mail = new Mail
                {
                    Id = Guid.NewGuid(),
                    ToEmail = model.ToEmail,
                    Subject = model.Subject,
                    Body = model.Body,
                    FilePaths = filePaths != null ? string.Join(";", filePaths) : null,
                    CreateDate = DateTime.UtcNow,
                    UpdateDate = DateTime.UtcNow
                };

                mail.CreateDate = DateTime.UtcNow;
                mail.CreatedById = GetCurrentUserId();

                await _context.Mails.AddAsync(mail);
                await _context.SaveChangesAsync();
            }

            return emailSent;
        }

        public async Task<bool> ResendEmailAsync(Guid mailId)
        {
            var originalMail = await _context.Mails.FindAsync(mailId);
            if (originalMail == null)
            {
                Console.WriteLine("Mail not found");
                return false;
            }

            var mailDto = new MailDto
            {
                ToEmail = originalMail.ToEmail,
                Subject = originalMail.Subject,
                Body = originalMail.Body,
                FormFiles = GetFilesFromPaths(originalMail.FilePaths!)
            };

            return await SendEmailAsync(mailDto);
        }

        private List<IFormFile> GetFilesFromPaths(string filePaths)
        {
            var files = new List<IFormFile>();

            if (!string.IsNullOrEmpty(filePaths))
            {
                var paths = filePaths.Split(';');

                foreach (var path in paths)
                {
                    var fullPath = Path.Combine(_uploadPath, path);
                    if (File.Exists(fullPath))
                    {
                        var stream = new FileStream(fullPath, FileMode.Open, FileAccess.Read);
                        var file = new FormFile(stream, 0, stream.Length, Path.GetFileName(fullPath), Path.GetFileName(fullPath));
                        files.Add(file);
                    }
                }
            }

            return files;
        }


        private void AttachFilesToEmail(BodyBuilder bodyBuilder, List<string> filePaths)
        {
            foreach (var filePath in filePaths)
            {
                var path = Path.Combine(_uploadPath, filePath);

                var attachment = new MimePart()
                {
                    Content = new MimeContent(File.OpenRead(path)),
                    ContentDisposition = new ContentDisposition(ContentDisposition.Attachment),
                    ContentTransferEncoding = ContentEncoding.Base64,
                    FileName = Path.GetFileName(path)
                };
                bodyBuilder.Attachments.Add(attachment);
            }
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

        private string GetCurrentUserId()
        {
            return _httpContextAccessor
                .HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value
                    ?? string.Empty;
        }
    }
}
