using API.Data;
using API.Interfaces;
using API.Mappings;
using API.Services;
using DinkToPdf;
using DinkToPdf.Contracts;
using Hangfire;
using Hangfire.SqlServer;
using Microsoft.EntityFrameworkCore;
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
            services.AddDbContext<DataContext>(option =>
            {
                option.UseSqlServer(config.GetConnectionString("app-conn"));
            });

            // Add Hangfire services.
            services.AddHangfire(configuration => configuration
                .SetDataCompatibilityLevel(CompatibilityLevel.Version_180)
                .UseSimpleAssemblyNameTypeSerializer()
                .UseRecommendedSerializerSettings()
                .UseSqlServerStorage(config.GetConnectionString("app-conn"), new SqlServerStorageOptions
                {
                    CommandBatchMaxTimeout = TimeSpan.FromMinutes(10),
                    SlidingInvisibilityTimeout = TimeSpan.FromMinutes(10),
                    QueuePollInterval = TimeSpan.Zero,
                    UseRecommendedIsolationLevel = true,
                    DisableGlobalLocks = true,
                    CommandTimeout = TimeSpan.FromMinutes(10),
                }));

            services.AddHangfireServer();

            services.AddMvc();

            // Auto Mappers
            services.AddAutoMapper(typeof(DocumentProfile).Assembly);
            services.AddAutoMapper(typeof(AuthorityProfile).Assembly);

            services.AddHttpClient();

            // for get current user info
            services.AddHttpContextAccessor();

            services.AddSingleton(typeof(IConverter), new SynchronizedConverter(new PdfTools()));

            // Services
            services.AddScoped(typeof(IAuthService), typeof(AuthService));
            services.AddScoped(typeof(IDocumentService), typeof(DocumentService));
            services.AddScoped(typeof(IChatGptService), typeof(ChatGptService));
            services.AddScoped<IAuthorityService, AuthorityService>();
            services.AddScoped<EmailService>();
            services.AddScoped<FileService>();

            

            // Report services
            services.AddWkhtmltopdf("wkhtmltopdf");
            


            return services;
        }
    }
}