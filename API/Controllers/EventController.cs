using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Helpers;
using API.Interfaces;
using API.RequestParams;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{ 
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        private readonly IEventService _eventService;

        public EventController(IEventService eventService)
        {
            _eventService = eventService;
        }


        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Create([FromBody] EventSaveDto model)
        {
            try
            {
                var events = await _eventService.AddEventAsync(model);
                return Ok(events);
            }
            catch (Exception ex)
            {
                return BadRequest($"An error occurred while creating the Car: {ex.Message}");
            }
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<EventDto>>> GetAllEvents([FromQuery] EventParams contactParams)
        {
            var contacts = await _eventService.GetAllEventsAsync(contactParams);
            return Ok(contacts);
        }
    }
}