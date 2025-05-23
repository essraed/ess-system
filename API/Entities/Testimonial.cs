
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using API.Helpers;

namespace API.Entities
{
    public class Testimonial
    {
        public Guid Id { get; set; }

        [Required]
        public string CustomerName { get; set; } = default!;

        [Required]
        public string Message { get; set; } = default!;

        [DisplayFormat(DataFormatString = "{0:dd-MM-yyyy hh:mm tt}", ApplyFormatInEditMode = true)]
        public DateTime? CreateDate { get; set; }

        [DisplayFormat(DataFormatString = "{0:dd-MM-yyyy hh:mm tt}", ApplyFormatInEditMode = true)]
        public DateTime? UpdateDate { get; set; }

        public string? CreatedById { get; set; }
        public AppUser? CreatedBy { get; set; }

        public bool IsDeleted { get; set; } = false;


    }

}