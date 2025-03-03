using System;
using System.Threading.Tasks;
using API.DTOs.Clients;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using API.RequestParams;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClientController : ControllerBase
    {
        private readonly IClientService _clientService;

        public ClientController(IClientService clientService)
        {
            _clientService = clientService;
        }

        // Get all clients
        [HttpGet]
        public async Task<ActionResult<PagedList<ClientDto>>> GetAllClients([FromQuery] ClientParams clientParams)
        {
            var clients = await _clientService.GetAllClientsAsync(clientParams);
            return Ok(clients);
        }

        // Get client by ID
        [HttpGet("{id}")]
        public async Task<ActionResult<ClientDto>> GetClientById(Guid id)
        {
            try
            {
                var client = await _clientService.GetClientByIdAsync(id);
                return Ok(client);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }

        // Add a new client
        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult<ClientDto>> AddClient([FromBody] ClientSaveDto clientSaveDto)
        {
            try
            {
                var createdClient = await _clientService.AddClientAsync(clientSaveDto);
                return CreatedAtAction(nameof(GetClientById), new { id = createdClient.Id }, createdClient);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // Update an existing client
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateClient(Guid id, [FromBody] ClientSaveDto clientSaveDto)
        {
            try
            {
                await _clientService.UpdateClientAsync(id, clientSaveDto);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // Delete a client
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClient(Guid id)
        {
            try
            {
                await _clientService.DeleteClientAsync(id);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut("{id}/status/in-process")]
        public async Task<IActionResult> SetClientStatusInProcess(Guid id)
        {
            try
            {
                await _clientService.SetClientStatusAsync(id, ClientStatus.InProcess);
                return Ok("Client status set to 'InProcess'.");
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest($"An error occurred while updating client status: {ex.Message}");
            }
        }

        // Set client status to "Accepted"
        [HttpPut("{id}/status/accepted")]
        public async Task<IActionResult> SetClientStatusAccepted(Guid id)
        {
            try
            {
                await _clientService.SetClientStatusAsync(id, ClientStatus.Accepted);
                return Ok("Client status set to 'Accepted'.");
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest($"An error occurred while updating client status: {ex.Message}");
            }
        }

        // Set client status to "Rejected"
        [HttpPut("{id}/status/rejected")]
        public async Task<IActionResult> SetClientStatusRejected(Guid id)
        {
            try
            {
                await _clientService.SetClientStatusAsync(id, ClientStatus.Rejected);
                return Ok("Client status set to 'Rejected'.");
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest($"An error occurred while updating client status: {ex.Message}");
            }
        }
    }
}
