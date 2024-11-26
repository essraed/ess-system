
using API.DTOs;
using API.Helpers;
using API.RequestParams;

namespace API.Interfaces
{
    public interface IDocumentService
    {
        Task<PagedList<DocumentDto>> GetDocumentsAsync(DocumentParams DocumentParams);
        Task<DocumentDto> GetDocumentByIdAsync(Guid id);
        Task<DocumentDto> AddDocumentAsync(DocumentCreateDto model);
        Task UpdateDocumentAsync(Guid id, DocumentUpdateDto model);
        Task DeleteDocumentAsync(Guid id);
        public byte[] GenerateDocumentReport();
    }
}