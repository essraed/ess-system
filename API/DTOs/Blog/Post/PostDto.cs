

using API.Helpers;

namespace API.DTOs
{
    public class PostDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = default!;
        public string Content { get; set; } = default!;

        public ICollection<FileResponseDto>? FileEntities { get; set; }
        public ICollection<PostSectionDto>? PostSections { get; set; }

    }
}