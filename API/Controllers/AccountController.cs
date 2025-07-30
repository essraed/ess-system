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
using AspNetCore.ReportingServices.ReportProcessing.ReportObjectModel;
using API.RequestParams;
using AutoMapper.QueryableExtensions;
using Org.BouncyCastle.Asn1.UA;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IAuthService _authService;
        private readonly IMapper _mapper;
        private readonly IEmailService _emailService;



        public AccountController(UserManager<AppUser> userManager, IMapper mapper, IEmailService emailService,
            IAuthService authService)
        {
            _emailService = emailService;
            _userManager = userManager;
            _authService = authService;
            _mapper = mapper;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> LoginWithEmailAsync(LoginDto model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);

            if (user is null || !user.Active) return BadRequest("Invalid Email or password");

            var result = await _userManager.CheckPasswordAsync(user, model.Password);

            if (result)
            {
                var roles = await _userManager.GetRolesAsync(user);
                return await CreateUserObject(user, roles);
            }

            return BadRequest("Invalid Email or password");
        }

        [Authorize(Roles = "ADMIN")]
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> RegisterWithEmailAsync(RegisterDto model)
        {
            if (await _userManager.Users.AnyAsync(x => x.Email == model.Email))
            {
                ModelState.AddModelError("email", "Email Taken");
                return BadRequest("Email Taken");
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
                // if (!string.IsNullOrEmpty(model.Role))
                // {
                //     await _userManager.AddToRoleAsync(user, model.Role);
                // }
                if (model.Role == RolesNames.USER)
                {
                    await _userManager.AddToRoleAsync(user, RolesNames.USER);
                }
                else if (model.Role == RolesNames.MARKETUSER)
                {
                    await _userManager.AddToRoleAsync(user, RolesNames.MARKETUSER);
                }
                else if (model.Role == RolesNames.ADMIN)
                {
                    await _userManager.AddToRoleAsync(user, RolesNames.ADMIN);
                }
                else if (model.Role == RolesNames.MARKETIGNMANAGER)
                {
                    await _userManager.AddToRoleAsync(user, RolesNames.MARKETIGNMANAGER);
                }
                var roles = await _userManager.GetRolesAsync(user!);

                return await CreateUserObject(user, roles);
            }

            return BadRequest(result.Errors);
        }

        [HttpPost("register-with-otp")]
        public async Task<ActionResult<UserDto>> RegisterWithEmailUsingOtpAsync([FromBody] RegisterDtoByEmail model)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Email == model.Email);

            var otpPassword = OTP.GenerateOtp(); // New OTP every time

            if (user == null)
            {
                user = new AppUser
                {
                    DisplayName = model.DisplayName,
                    Email = model.Email,
                    UserName = model.Email.Split('@')[0],
                };

                var createResult = await _userManager.CreateAsync(user, otpPassword);
                if (!createResult.Succeeded)
                    return BadRequest(createResult.Errors);
            }
            else
            {
                var resetToken = await _userManager.GeneratePasswordResetTokenAsync(user);
                var resetResult = await _userManager.ResetPasswordAsync(user, resetToken, otpPassword);
                if (!resetResult.Succeeded)
                    return BadRequest(resetResult.Errors);
            }

            // Assign role if not already assigned
            var roles = await _userManager.GetRolesAsync(user);
            if (roles.Count == 0)
            {
                var role = RolesNames.CUSTOMER;
                await _userManager.AddToRoleAsync(user, role);
            }

            // Send OTP via email
            string otp = OTP.GenerateOtp(); // e.g., "123456"

            string otpBody = $@"
                        <p>Dear Customer,</p>
                        <p>Your one-time password (OTP) has been generated. Please use the code below to log in:</p>

                        <h2 style='color: #28a745; font-size: 24px;'>{otp}</h2>

                        <p>This code is valid for a limited time and should not be shared with anyone.</p>
                        <p>Best regards,<br/>KBC Team</p>

                        <p style='margin-top: 30px; font-size: 12px; color: #888;'>
                            <small>This email was sent on {DateTime.Now:dd-MM-yyyy hh:mm tt}.</small>
                        </p>
                    ";

            // Send the email
            await _emailService.SendEmailAsync(user.Email, "Your One-Time Password (OTP)", otpBody);

            roles = await _userManager.GetRolesAsync(user); // refresh roles
            return await CreateUserObject(user, roles);
        }



        [Authorize(Roles = "ADMIN")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(Guid id, [FromBody] UserIdAndNameDto userDto)
        {
            var user = await _userManager.FindByIdAsync(id.ToString() ?? "");

            if (user == null)
            {
                return NotFound("User not found");
            }

            // Update other user properties
            user.Email = userDto.Email;
            user.DisplayName = userDto.DisplayName!;

            IdentityResult result;

            // Handle password update if provided
            if (!string.IsNullOrWhiteSpace(userDto.Password))
            {
                // Remove the old password and add the new one
                await _userManager.RemovePasswordAsync(user);
                result = await _userManager.AddPasswordAsync(user, userDto.Password);

                if (!result.Succeeded)
                {
                    return BadRequest(result.Errors);
                }
            }

            // Save changes to other user properties
            result = await _userManager.UpdateAsync(user);

            if (result.Succeeded)
            {
                return Ok("User updated successfully");
            }

            return BadRequest(result.Errors);
        }


        [Authorize(Roles = "ADMIN")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeactivateUser(string Id)
        {
            var user = await _userManager.FindByIdAsync(Id);
            if (user == null)
            {
                return NotFound("User Not Found");
            }

            user.Active = false;

            var result = await _userManager.UpdateAsync(user);

            if (result.Succeeded)
            {
                return Ok("User Deleted Successfully");
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

        [Authorize(Roles = "ADMIN")]
        [HttpGet("getUsersIdAndName")]
        public async Task<ActionResult<PagedList<UserIdAndNameDto>>> GetUsersIdAndName([FromQuery] UserParams userParams)
        {
            var query = _userManager.Users.AsNoTracking().AsQueryable();

            if (!string.IsNullOrWhiteSpace(userParams.SearchTerm))
            {
                var searchTerm = userParams.SearchTerm.Trim().ToLower();
                query = query.Where(x =>
                    x.UserName!.ToLower().Contains(searchTerm) ||
                    (!string.IsNullOrEmpty(x.Email) && x.Email.ToLower().Contains(searchTerm)) ||
                    (!string.IsNullOrEmpty(x.DisplayName) && x.DisplayName.ToLower().Contains(searchTerm)));
            }

            query = query.Where(x => x.Active == true);

            return await PagedList<UserIdAndNameDto>.CreateAsync(
                query.ProjectTo<UserIdAndNameDto>(_mapper.ConfigurationProvider),
                userParams.PageNumber,
                userParams.PageSize);
        }


        [Authorize(Roles = "ADMIN")]
        [HttpGet("GetUserById/{id}")]
        public async Task<ActionResult<UserIdAndNameDto>> GetUSerById(Guid id)
        {

            var user = await _userManager.FindByIdAsync(id.ToString());

            if (user == null)
            {
                return NotFound("User Not Found");
            }

            return _mapper.Map<UserIdAndNameDto>(user);

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