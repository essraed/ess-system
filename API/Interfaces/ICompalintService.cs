using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs.LostDto;
using API.Helpers;
using API.RequestParams;

namespace API.Interfaces
{
    public interface ICompalintService
    {
        Task<PagedList<ComplaintDto>> GetAllComplaintItemsAsync(ComplaintParams complaintParams);
        Task<ComplaintDto> GetComplaintItemByIdAsync(Guid id);
        Task<ComplaintDto> AddComplaintItemAsync(ComplaintSaveDto complaintSaveDto);
        Task DeleteComplaintItemAsync(Guid id);
        Task SetComplaintStateInProcess(Guid id);
        Task SetComplaintStateCompleted(Guid id);
    }
}