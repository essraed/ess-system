
using System.Text;
using API.Data;
using API.Helpers;
using API.Entities;
using API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace API.Extensions
{
    public static class IdentityeServiceExtensions
    {
        public static IServiceCollection AddIdentityServices (this IServiceCollection services, IConfiguration config)
        {
            services.AddIdentityCore<AppUser>(opt => {
                opt.Password.RequireNonAlphanumeric = false;
                opt.User.RequireUniqueEmail = false;
            })
            .AddRoles<IdentityRole>()
            .AddEntityFrameworkStores<DataContext>();
            //.AddDefaultTokenProviders();

            services.AddAuthentication();
            services.Configure<JWT>(config.GetSection("JWT"));
            services.AddScoped<AuthService>();

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["JWT:Key"]!));

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(opt => {
                    opt.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = key,
                        ValidateIssuer = false,
                        ValidateAudience = false,
                    };
                });

            services.AddCors(opt =>
            {
                opt.AddPolicy("Allow-Origin", policy =>
                {
                    policy.AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowAnyOrigin();
                        // .WithOrigins("http://localhost:3000", "http://localhost:4200");
                });
            });

            return services;
        }
    }
}