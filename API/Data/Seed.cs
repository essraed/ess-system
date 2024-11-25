using API.Helpers;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace API.Data
{
    public class Seed
    {

        public static async Task SeedData(DataContext context,
            UserManager<AppUser> userManager,
            RoleManager<IdentityRole> _roleManager,
            ILoggerFactory loggerFactory,
            IWebHostEnvironment _environment)
        {
            try
            {
                // Users
                if (!userManager.Users.Any())
                {
                    var roles = new List<IdentityRole>
                    {
                        new IdentityRole { Name = RolesNames.USER },
                        new IdentityRole { Name = RolesNames.ADMIN },
                    };

                    foreach (var role in roles)
                    {
                        await _roleManager.CreateAsync(role);
                    }

                    await context.SaveChangesAsync();

                    var Admin = new AppUser
                    {
                        DisplayName = "Manager",
                        UserName = "Manager",
                        Email = "manager@manager.com"
                    };

                    var createdUser = await userManager.CreateAsync(Admin, "Pa$$w0rd");

                    if (createdUser.Succeeded)
                    {
                        var role = await context.Roles
                            .Where(x => x.Name == RolesNames.ADMIN)
                            .FirstOrDefaultAsync();

                        if (role != null)
                        {
                            // Add the user to the ADMIN role
                            await userManager.AddToRoleAsync(Admin, role?.Name!);

                            // Save changes after adding the user to the role
                            await context.SaveChangesAsync();
                        }
                    }
                }

                if (!context.Categories.Any())
                {
                    var filePath = Path.Combine(_environment.WebRootPath, "seed", "categoryData.json");

                    if (File.Exists(filePath))
                    {
                        var jsonData = await File.ReadAllTextAsync(filePath);
                        var categories = JsonConvert.DeserializeObject<List<Category>>(jsonData);

                        if (categories != null)
                        {
                            foreach (var category in categories)
                            {
                                category.CreateDate = TimeHelper.GetCurrentTimeInAbuDhabi();
                            }

                            context.Categories.AddRange(categories);
                            await context.SaveChangesAsync();
                        }
                    }
                    else
                    {
                        throw new FileNotFoundException($"The file '{filePath}' was not found.");
                    }
                }


            }
            catch (SystemException ex)
            {
                var logger = loggerFactory.CreateLogger<Seed>();
                logger.LogError(ex.Message);
            }
        }

    }
}