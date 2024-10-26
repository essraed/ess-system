using API.Helpers;
using Hangfire.Dashboard;

namespace API.Filters
{
    public class HangfireAuthorizationFilter : IDashboardAuthorizationFilter
    {
        public bool Authorize(DashboardContext context)
        {
            var httpContext = context.GetHttpContext();

            // Allow all authenticated users to see the Dashboard (potentially dangerous).
            return httpContext.User.Identity?.IsAuthenticated ?? false && httpContext.User.IsInRole(RolesNames.ADMIN);
        }
    }
}