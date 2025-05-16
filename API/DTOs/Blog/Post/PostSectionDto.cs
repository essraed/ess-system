

using API.Helpers;

namespace API.DTOs
{
  public class PostSectionDto
    {
        public Guid Id { get; set; }
        public string SubHeader { get; set; } = default!;
        public string Content { get; set; } = default!;
       
    }
}