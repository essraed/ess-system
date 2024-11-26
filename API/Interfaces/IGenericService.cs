
using API.DTOs;

namespace API.Interfaces
{
    public interface IGenericService<T> where T : class
    {
        Task<IList<DropdownDto>> GetAllDropdownAsync();
    }
}