
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using API.Helpers;

namespace API.Entities
{
    public class Post
    {
        public Guid Id { get; set; }

        [Required]
        public string Title { get; set; } = default!;

        [Required]
        public string Content { get; set; } = default!;

        public Guid BlogId { get; set; }
        public Blog Blog { get; set; } = default!;
        public ICollection<FileEntity>? FileEntities { get; set; }

        public ICollection<PostSection>? PostSections { get; set; }

    }

}