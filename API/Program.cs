using API.Data;
using API.Extensions;
using API.Entities;
using API.Hubs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// builder.WebHost.UseUrls("http://192.168.7.120:5000");

// Add services to the container.
builder.Services.AddControllers(opt =>
{
    var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
    opt.Filters.Add(new AuthorizeFilter(policy));
});

builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);

// SignalR setup
builder.Services.AddSignalR();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// CORS setup: make sure you have configured it correctly
app.UseCors("Allow-Origin");

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.MapHub<NotificationHub>("/notificationHub");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.UseDefaultFiles();

app.MapFallbackToFile("index.html");


using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var loggerFactory = services.GetRequiredService<ILoggerFactory>();
    var userManager = services.GetRequiredService<UserManager<AppUser>>();
    var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();
    var webHostEnv = services.GetRequiredService<IWebHostEnvironment>();

    try
    {
        var context = services.GetRequiredService<DataContext>();
        await context.Database.MigrateAsync();
        await Seed.SeedData(context, userManager, roleManager, loggerFactory, webHostEnv);
    }
    catch (Exception ex)
    {
        var logger = loggerFactory.CreateLogger<Program>(); 
        logger.LogError(ex, "An error occurred during migration");
    }
}

app.Run();
