
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class AppUser : IdentityUser
    {
        [Required, MaxLength(50)]
        public string DisplayName { get; set; } = default!;
        public bool Active { get; set; } = true;
        
        public ICollection<Document>? Documents { get; set; }
    }
}
