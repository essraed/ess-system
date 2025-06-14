using API.DTOs;
using API.DTOs.LostDto;
using API.Helpers;
using API.RequestParams;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface ILostService
    {
        Task<PagedList<LostDto>> GetAllLostItemsAsync(LostParams lostParams);
        Task<LostDto> GetLostItemByIdAsync(Guid id);
        Task<LostDto> AddLostItemAsync(LostSaveDto lostSaveDto);
        Task DeleteLostItemAsync(Guid id);
        Task SetLostStateInProcess(Guid id, string remark);
        Task SetLosttateCompleted(Guid id);
        Task<string> UploadImage(FileUploadNewDto model);
    }
}
