using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using API.Models.Identity;
using API.Interfaces;
using System.Security.Claims;
using API.Helpers;
using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IAuthService _authService;
        private readonly IMapper _mapper;


        public AccountController(UserManager<AppUser> userManager, IMapper mapper,
            IAuthService authService)
        {
            _userManager = userManager;
            _authService = authService;
            _mapper = mapper;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> LoginWithEmailAsync(LoginDto model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);

            if (user is null) return BadRequest("Invalid Email or password");

            var result = await _userManager.CheckPasswordAsync(user, model.Password);

            if (result)
            {
                var roles = await _userManager.GetRolesAsync(user);
                return await CreateUserObject(user, roles);
            }

            return BadRequest("Invalid Email or password");
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> RegisterWithEmailAsync(RegisterDto model)
        {
            if (await _userManager.Users.AnyAsync(x => x.Email == model.Email))
            {
                ModelState.AddModelError("email", "Email Taken");
                return ValidationProblem("Email Taken");
            }

            var user = new AppUser
            {
                DisplayName = model.DisplayName,
                Email = model.Email,
                UserName = model.Email.Split('@')[0],
            };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                // add user to 'User' role by default.
                if (!string.IsNullOrEmpty(model.Role)) {
                    await _userManager.AddToRoleAsync(user, model.Role);
                }
                else {
                    await _userManager.AddToRoleAsync(user, RolesNames.USER);
                }
                var roles = await _userManager.GetRolesAsync(user!);

                return await CreateUserObject(user, roles);
            }

            return BadRequest(result.Errors);
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.FindByIdAsync(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            if (user is null) BadRequest("Retry, this user not found");

            var roles = await _userManager.GetRolesAsync(user!);

            if (roles is null) { BadRequest("Retry, this user not found"); }

            return new UserDto
            {
                Id = user!.Id,
                DisplayName = user.DisplayName,
                Username = user.UserName,
                Token = await _authService.CreateToken(user),
                Roles = roles ?? null
            };
        }

        [Authorize]
        [HttpGet("getUsersIdAndName")]
        public async Task<ActionResult<List<UserIdAndNameDto>>> GetUsersIdAndName()
        {
            var users = await _userManager.Users.ToListAsync();

            if (users is null || !users.Any())
            {
                return BadRequest("No users found.");
            }

            var userIdAndNameList = _mapper.Map<List<UserIdAndNameDto>>(users);

            return Ok(userIdAndNameList);
        }

        private async Task<ActionResult<UserDto>> CreateUserObject(AppUser user, IList<string>? roles)
        {
            return new UserDto
            {
                Id = user.Id,
                DisplayName = user.DisplayName,
                Username = user.UserName!,
                Token = await _authService.CreateToken(user),
                Roles = roles
            };
        }
        private async Task<ActionResult<UserDto>> CurrentUserObject(AppUser user)
        {
            return new UserDto
            {
                Id = user.Id,
                DisplayName = user.DisplayName,
                Username = user.UserName!,
                Token = await _authService.CreateToken(user),
            };
        }
    }
}