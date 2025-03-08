using API.DTOs;

public class SendEmailRequest
{
    public string? Email { get; set; }
    public List<FileResponseDto>? Files { get; set; }
}
