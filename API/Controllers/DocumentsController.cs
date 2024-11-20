
using API.DTOs;
using API.Entities;
using API.Interfaces;
using API.RequestParams;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class DocumentsController : ControllerBase
    {
        private readonly IDocumentService _documentService;

        public DocumentsController(IDocumentService documentService)
        {
            _documentService = documentService;
        }

        [HttpGet("download-pdf")]
        public IActionResult DownloadPdfReport()
        {
            var report = _documentService.GenerateDocumentReport();

            return File(report, "application/pdf", "DocumentReport.pdf");
        }

        [HttpGet]
        public async Task<ActionResult<DocumentDto>> GetAllDocuments([FromQuery] DocumentParams DocumentParams)
        {
            return Ok(await _documentService.GetDocumentsAsync(DocumentParams));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DocumentDto>> GetDocument(Guid id)
        {
            try
            {
                return Ok(await _documentService.GetDocumentByIdAsync(id));
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult> CreateDocument([FromBody] DocumentCreateDto model)
        {
            try
            {
                await _documentService.AddDocumentAsync(model);
                return Ok("Document created successfully.");
            }
            catch (Exception ex)
            {
                return BadRequest($"An error occurred while saving the Document: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateDocument(Guid id, DocumentUpdateDto model)
        {
            try
            {
                await _documentService.UpdateDocumentAsync(id, model);
                return Ok("Update completed successfully");
            }
            catch (Exception ex)
            {
                return BadRequest($"An error occurred while updating the Document: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteDocument(Guid id)
        {
            try
            {
                await _documentService.DeleteDocumentAsync(id);
                return Ok("Delete completed Successfully");
            }
            catch (Exception ex)
            {
                return BadRequest($"An error occurred while deleting the Document: {ex.Message}");
            }
        }
    }
}
