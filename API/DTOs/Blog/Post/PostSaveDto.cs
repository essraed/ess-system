

using System.ComponentModel.DataAnnotations;
using API.Helpers;

namespace API.DTOs
{
    public class PostSaveDto
    {
        [Required]

        public string Title { get; set; } = default!;
        [Required]

        public string Content { get; set; } = default!;


        public List<PostSectionSaveDto>? PostSections { get; set; }

    }
}