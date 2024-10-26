using API.Helpers;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class Seed
    {

        public static async Task SeedData(DataContext context,
            UserManager<AppUser> userManager,
            RoleManager<IdentityRole> _roleManager,
            ILoggerFactory loggerFactory)
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

            }
            catch (SystemException ex)
            {
                var logger = loggerFactory.CreateLogger<Seed>();
                logger.LogError(ex.Message);
            }
        }

    }
}