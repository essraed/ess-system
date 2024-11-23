
using API.DTOs;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class WorkingTimeController : ControllerBase
    {
        private readonly IWorkingTimeService _workingTimeService;

        public WorkingTimeController(IWorkingTimeService workingTimeService)
        {
            _workingTimeService = workingTimeService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<WorkingTimeDto>>> GetAll()
        {
            var workingTimes = await _workingTimeService.GetAllAsync();
            return Ok(workingTimes);
        }

        [HttpPost]
        public async Task<ActionResult<WorkingTimeDto>> Create([FromBody] WorkingTimeSaveDto workingTimeSaveDto)
        {
            var workingTimeDto = await _workingTimeService.CreateAsync(workingTimeSaveDto);
            return CreatedAtAction(nameof(GetAll), new { id = workingTimeDto.Id }, workingTimeDto);
        }
    }

}