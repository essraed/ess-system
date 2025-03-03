using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Data;
using API.DTOs.Clients;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using API.RequestParams;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

public class ClientService : IClientService
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public ClientService(DataContext context, IMapper mapper, IHttpContextAccessor httpContextAccessor)
    {
        _context = context;
        _mapper = mapper;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task<PagedList<ClientDto>> GetAllClientsAsync(ClientParams clientParams)
    {
        var query = _context.Clients
            .Where(x => !x.IsDeleted)
            .Include(x => x.CreatedBy)
            .Include(x => x.UpdatedBy)
            .AsNoTracking()
            .AsQueryable();

        if (clientParams.BookingId != Guid.Empty && clientParams.BookingId != null)
        {
            query = query.Where(x => x.BookingId == clientParams.BookingId);
        }

        if (!string.IsNullOrEmpty(clientParams.SearchTerm))
        {
            query = query.Where(x => x.Name.Contains(clientParams.SearchTerm) || x.PassportNumber.Contains(clientParams.SearchTerm));
        }

        if (clientParams.ClientStatus != null)
        {
            query = query.Where(x => x.Status == clientParams.ClientStatus);
        }

        return await PagedList<ClientDto>.CreateAsync(
            query.ProjectTo<ClientDto>(_mapper.ConfigurationProvider),
            clientParams.PageNumber,
            clientParams.PageSize);
    }

    public async Task<ClientDto> GetClientByIdAsync(Guid id)
    {
        var client = await _context.Clients
            .Include(x => x.CreatedBy)
            .Include(x => x.UpdatedBy)
            .FirstOrDefaultAsync(x => x.Id == id);

        if (client == null)
        {
            throw new KeyNotFoundException($"Client with id {id} not found.");
        }

        return _mapper.Map<ClientDto>(client);
    }

    public async Task<ClientDto> AddClientAsync(ClientSaveDto model)
    {
        var client = _mapper.Map<Client>(model);
        client.Id = Guid.NewGuid();
        client.CreateDate = DateTime.UtcNow;

        _context.Clients.Add(client);
        var result = await _context.SaveChangesAsync() > 0;

        if (result)
        {
            return _mapper.Map<ClientDto>(client);
        }
        else
        {
            throw new Exception("An error occurred while saving the client.");
        }
    }

    public async Task UpdateClientAsync(Guid id, ClientSaveDto clientSaveDto)
    {
        var client = await _context.Clients.FindAsync(id);

        if (client == null)
        {
            throw new KeyNotFoundException($"Client with id {id} not found.");
        }

        _mapper.Map(clientSaveDto, client);
        client.UpdateDate = DateTime.UtcNow;
        client.UpdatedById = GetCurrentUserId();

        var result = await _context.SaveChangesAsync() > 0;
        if (!result)
        {
            throw new Exception("Failed to update client.");
        }
    }

    public async Task DeleteClientAsync(Guid id)
    {
        var client = await _context.Clients.FindAsync(id);

        if (client == null)
        {
            throw new KeyNotFoundException($"Client with id {id} not found.");
        }

        client.IsDeleted = true;
        await _context.SaveChangesAsync();
    }

    public async Task SetClientStatusAsync(Guid id, ClientStatus status)
    {
        var client = await _context.Clients.FindAsync(id);

        if (client == null)
        {
            throw new KeyNotFoundException($"Client with id {id} not found.");
        }

        client.Status = status;  // Update status
        client.UpdatedById = GetCurrentUserId();  // Optionally track who updated
        client.UpdateDate = DateTime.UtcNow;  // Track the time of update

        var result = await _context.SaveChangesAsync() > 0;
        if (!result)
        {
            throw new Exception("Failed to update client status.");
        }
    }


    private string GetCurrentUserId()
    {
        return _httpContextAccessor
            .HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value
            ?? null!;
    }

}
