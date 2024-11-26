
using API.DTOs;
using API.Helpers;
using API.RequestParams;

namespace API.Interfaces
{
    public interface IAuthorityService
    {
        Task<PagedList<AuthorityDto>> GetAllAuthoritiesAsync(AuthorityParams authorityParams);
        Task<AuthorityDto> GetAuthorityByIdAsync(Guid id);
        Task<AuthorityDto> AddAuthorityAsync(AuthoritySaveDto model);
        Task UpdateAuthorityAsync(Guid id, AuthoritySaveDto model);
        Task DeleteAuthorityAsync(Guid id);
        Task<List<DropdownDto>> GetAllDropdownAsync();
    }
}