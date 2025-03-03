using API.DTOs.Clients;
using API.Entities;
using API.Helpers;
using API.RequestParams;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IClientService
    {
        Task<PagedList<ClientDto>> GetAllClientsAsync(ClientParams clientParams);
        Task<ClientDto> GetClientByIdAsync(Guid id);
        Task<ClientDto> AddClientAsync(ClientSaveDto clientSaveDto);
        Task UpdateClientAsync(Guid id, ClientSaveDto clientSaveDto);
        Task DeleteClientAsync(Guid id);
        Task SetClientStatusAsync(Guid id, ClientStatus status);
    }
}
