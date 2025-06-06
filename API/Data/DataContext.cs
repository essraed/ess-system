
using API.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Document>()
                .HasOne(d => d.CreatedBy)
                .WithMany(u => u.Documents)
                .HasForeignKey(d => d.CreatedById)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Document>()
                .HasOne(d => d.UpdatedBy)
                .WithMany()
                .HasForeignKey(d => d.UpdatedById)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Booking>()
                .Property(x => x.BookingStatus)
                .HasConversion<string>();

            modelBuilder.Entity<Booking>()
                .HasOne(b => b.Payment)
                .WithMany(p => p.Bookings)
                .HasForeignKey(b => b.PaymentId)
                .OnDelete(DeleteBehavior.Restrict);


        }

        public DbSet<Document> Documents { get; set; }
        public DbSet<Authority> Authorities { get; set; }
        public DbSet<Car> Cars { get; set; }
        public DbSet<Blog> Blogs { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<EventPRO> EventPROs { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<ServiceOption> ServiceOptions { get; set; }
        public DbSet<WorkingTime> WorkingTimes { get; set; }
        public DbSet<FileEntity> FileEntities { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<Contact> Contacts { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Lost> Losts { get; set; }
        public DbSet<Complaint> Complaints { get; set; }
        public DbSet<Nationality> Nationalities { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<Post> Posts { get; set; }   
        public DbSet<PostSection> PostSections { get; set; }   
        public DbSet<Testimonial> Testimonials { get; set; }   
    }
}