namespace API.Models.Identity
{
    // Contain properties return back after loging or register.
    public class UserDto
    {
        public required string Id { get; set; }
        public string? DisplayName { get; set; }
        public string? Username { get; set; }
        public bool? Active { get; set; }
        public string? Password { get; set; } 
        public string? Token { get; set; }
        public IList<string>? Roles { get; set; }
    }
}