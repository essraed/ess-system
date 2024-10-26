using System.Security.Claims;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using API.RequestParams;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using DinkToPdf;
using DinkToPdf.Contracts;
using Microsoft.EntityFrameworkCore;
using Wkhtmltopdf.NetCore;

namespace API.Services
{
    public class DocumentService : IDocumentService
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IConverter _converter;
        private readonly IGeneratePdf _generatePdf;
        private readonly IHttpContextAccessor _httpContextAccessor;


        public DocumentService(DataContext context, IMapper mapper,
            IHttpContextAccessor httpContextAccessor, IGeneratePdf generatePdf, IConverter converter)
        {
            _mapper = mapper;
            _context = context;
            _converter = converter;
            _generatePdf = generatePdf;
            _httpContextAccessor = httpContextAccessor;
        }

        public byte[] GenerateDocumentReport()
        {
            var users = _context.Users
               .Include(u => u.Documents)
               .Select(u => new
               {
                   DisplayName = u.DisplayName,
                   DocumentCount = u.Documents!.Count()
               })
               .ToList();

            // Generate HTML for the report with simplified styled content
            string html = $@"
    <h1 style='text-align: center; font-family: Arial, sans-serif; color: #333;'>Letters Report</h1>

    <style>
        body {{
            font-family: Arial, sans-serif;
            color: #333;
        }}
        table {{
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            font-size: 14px;
            text-align: left;
        }}
        th, td {{
            padding: 10px;
            border: 1px solid #000;
        }}
        th {{
            background-color: #f0f0f0;
            font-weight: bold;
        }}
        h1 {{
            font-size: 20px;
            margin-bottom: 20px;
        }}
    </style>

    <table>
        <thead>
            <tr>
                <th>User</th>
                <th>Document Count</th>
            </tr>
        </thead>
        <tbody>";

            foreach (var user in users)
            {
                html += $@"
        <tr>
            <td>{HtmlEncode(user.DisplayName)}</td>
            <td>{user.DocumentCount}</td>
        </tr>";
            }

            html += @"
        </tbody>
    </table>";

            // Set up PDF conversion
            var doc = new HtmlToPdfDocument()
            {
                GlobalSettings = {
                ColorMode = ColorMode.Color,
                Orientation = Orientation.Portrait,
                PaperSize = PaperKind.A4,
            },
                Objects = {
                new ObjectSettings() {
                    PagesCount = true,
                    HtmlContent = html,
                    WebSettings = { DefaultEncoding = "utf-8" },
                    HeaderSettings = { FontName = "Arial", FontSize = 9, Right = "Page [page] of [toPage]" },
                    FooterSettings = { FontName = "Arial", FontSize = 9, Line = true, Center = "Report Footer" }
                }
            }
            };

            // Convert HTML to PDF and return byte array
            return _converter.Convert(doc);
        }

        public async Task<PagedList<DocumentDto>> GetDocumentsAsync(DocumentParams documentParams)
        {
            var query = _context.Documents
                .Include(x => x.CreatedBy)
                .Include(x => x.UpdatedBy)
                .AsNoTracking()
                .AsQueryable();

            if (!string.IsNullOrEmpty(documentParams.SearchTerm))
            {
                query = query.Where(x => x.Brief.Contains(documentParams.SearchTerm));
            }

            if (!string.IsNullOrEmpty(documentParams.UserId))
            {
                query = query.Where(x => x.CreatedById == documentParams.UserId);
            }

            if (documentParams.From != null)
            {
                query = query.Where(x => x.CreateDate >= documentParams.From);
            }

            if (documentParams.To != null)
            {
                query = query.Where(x => x.CreateDate <= documentParams.To);
            }
            
            if (documentParams.AuthorityId != null || documentParams.AuthorityId != Guid.Empty)
            {
                query = query.Where(x => x.AuthorityId == documentParams.AuthorityId);
            }

            return await PagedList<DocumentDto>.CreateAsync(
                query.ProjectTo<DocumentDto>(_mapper.ConfigurationProvider),
                documentParams.PageNumber,
                documentParams.PageSize);
        }

        public async Task<DocumentDto> GetDocumentByIdAsync(Guid id)
        {
            var document = await _context.Documents.FindAsync(id);
            if (document == null)
            {
                throw new KeyNotFoundException($"Document with id {id} not found.");
            }
            return _mapper.Map<DocumentDto>(document);
        }

        public async Task<DocumentDto> AddDocumentAsync(DocumentCreateDto model)
        {
            try
            {
                var document = _mapper.Map<Document>(model);

                document.CreateDate = DateTime.UtcNow;
                document.CreatedById = GetCurrentUserId();

                _context.Documents.Add(document);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result)
                {
                    throw new Exception("Failed to add the Document.");
                }

                return _mapper.Map<DocumentDto>(document);
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred while adding the Document: {ex.Message}");
            }
        }

        public async Task UpdateDocumentAsync(Guid id, DocumentUpdateDto model)
        {
            try
            {
                var document = await _context.Documents.FindAsync(id);

                if (document == null)
                {
                    throw new KeyNotFoundException($"Document with id {id} not found.");
                }
                _mapper.Map(model, document);

                document.UpdateDate = DateTime.UtcNow;
                document.UpdatedById = GetCurrentUserId();

                var result = await _context.SaveChangesAsync() > 0;

                if (!result)
                {
                    throw new Exception("Failed to update the Document.");
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred while updating the Document: {ex.Message}");
            }
        }

        public async Task DeleteDocumentAsync(Guid id)
        {
            try
            {
                var document = await _context.Documents.FindAsync(id);

                if (document == null)
                {
                    throw new KeyNotFoundException($"Document with id {id} not found.");
                }
                _context.Remove(document);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result)
                {
                    throw new Exception("Failed to delete the Document.");
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred while deleting the Document: {ex.Message}");
            }
        }

        private string GetCurrentUserId()
        {
            return _httpContextAccessor
                .HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value
                    ?? string.Empty;
        }

        string HtmlEncode(string input)
        {
            return System.Net.WebUtility.HtmlEncode(input);
        }
    }
}
