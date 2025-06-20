using API.Data;
using API.Interfaces;
using API.Mappings;
using API.Services;
using DinkToPdf;
using DinkToPdf.Contracts;
using Microsoft.EntityFrameworkCore;
using StripeIntegrationDemo.Models;
using Wkhtmltopdf.NetCore;

namespace API.Extensions
{
    public static class ApplicationServicesExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddControllers();

            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
            services.AddDbContext<DataContext>(options =>
            {
                options.UseSqlServer(config.GetConnectionString("app-conn"));
            });

            // Add Hangfire services.
            // services.AddHangfire(configuration => configuration
            //     .SetDataCompatibilityLevel(CompatibilityLevel.Version_180)
            //     .UseSimpleAssemblyNameTypeSerializer()
            //     .UseRecommendedSerializerSettings()
            //     .UseSqlServerStorage(config.GetConnectionString("app-conn"), new SqlServerStorageOptions
            //     {
            //         CommandBatchMaxTimeout = TimeSpan.FromMinutes(10),
            //         SlidingInvisibilityTimeout = TimeSpan.FromMinutes(10),
            //         QueuePollInterval = TimeSpan.Zero,
            //         UseRecommendedIsolationLevel = true,
            //         DisableGlobalLocks = true,
            //         CommandTimeout = TimeSpan.FromMinutes(10),
            //     }));

            // services.AddHangfireServer();

            services.AddMvc();

            // Auto Mappers
            services.AddAutoMapper(typeof(DocumentProfile).Assembly);
            services.AddAutoMapper(typeof(AuthorityProfile).Assembly);
            services.AddAutoMapper(typeof(CarProfile).Assembly);
            services.AddAutoMapper(typeof(BlogProfile).Assembly);
            services.AddAutoMapper(typeof(BookingProfile).Assembly);
            services.AddAutoMapper(typeof(ServicesProfile).Assembly);
            services.AddAutoMapper(typeof(WorkingTimesProfile).Assembly);
            services.AddAutoMapper(typeof(ContactProfile).Assembly);
            services.AddAutoMapper(typeof(PaymentProfile).Assembly);
            services.AddAutoMapper(typeof(LostProfile).Assembly);
            services.AddAutoMapper(typeof(ComplaintProfile).Assembly);
            services.AddAutoMapper(typeof(LostProfile).Assembly);
            services.AddAutoMapper(typeof(ComplaintProfile).Assembly);
            services.AddAutoMapper(typeof(EventProfile).Assembly);
            services.AddAutoMapper(typeof(NationalityProfile).Assembly);
            services.AddAutoMapper(typeof(ClientProfile).Assembly);
            services.AddAutoMapper(typeof(EventPROProfile).Assembly);
            services.AddAutoMapper(typeof(TestimonialProfile).Assembly);

            services.AddHttpClient();

            // for get current user info
            services.AddHttpContextAccessor();

            services.AddSingleton(typeof(IConverter), new SynchronizedConverter(new PdfTools()));

            // RignalR
            services.AddSignalR();

            // Services
            services.AddScoped(typeof(IAuthService), typeof(AuthService));
            services.AddScoped(typeof(IDocumentService), typeof(DocumentService));
            services.AddScoped(typeof(IChatGptService), typeof(ChatGptService));
            services.AddScoped(typeof(ICarService), typeof(CarService));
            services.AddScoped(typeof(IBlogService), typeof(BlogService));
            services.AddScoped(typeof(IFileService), typeof(FileService));
            services.AddScoped(typeof(IAuthorityService), typeof(AuthorityService));
            services.AddScoped(typeof(IServiceService), typeof(ServiceService));
            services.AddScoped(typeof(ICategoryService), typeof(CategoryService));
            services.AddScoped(typeof(IWorkingTimeService), typeof(WorkingTimeService));
            services.AddScoped(typeof(IFileService), typeof(FileService));
            services.AddScoped(typeof(IBookingService), typeof(BookingService));
            services.AddScoped(typeof(INotificationService), typeof(NotificationService));
            services.AddScoped(typeof(IEmailService), typeof(EmailService));
            services.AddScoped(typeof(IContactService), typeof(ContactService));
            services.AddScoped(typeof(IPaymentService), typeof(PaymentService));
            services.AddScoped(typeof(ILostService), typeof(LostService));
            services.AddScoped(typeof(ICompalintService), typeof(ComplaintService));
            services.AddScoped(typeof(INationalityService), typeof(NationalityService));
            services.AddScoped(typeof(IClientService), typeof(ClientService));
            services.AddScoped(typeof(IEventService), typeof(EventService));
            services.AddScoped(typeof(IEventPROService), typeof(EventPROService));
            services.AddScoped(typeof(ITestimonialService), typeof(TestimonialService));
            services.AddScoped(typeof(IGenericService<>), typeof(GenericService<>));

            // // var stripeSettings = new StripeSettings
            // // {
            // //     SecretKey = Environment.GetEnvironmentVariable("Stripe__SecretKey"),
            // //     PublishableKey = Environment.GetEnvironmentVariable("Stripe__PublishableKey"),
            // //     WebhookSecret = Environment.GetEnvironmentVariable("Stripe__WebhookSecret")
            // // };

            // services.AddSingleton(stripeSettings);


            // Report services
            services.AddWkhtmltopdf("wkhtmltopdf");

            return services;
        }
    }
}