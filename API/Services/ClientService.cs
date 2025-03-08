using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
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

    private readonly IFileService _fileService;

    private readonly IEmailService _emailService;
    private readonly IWebHostEnvironment _env;

    public ClientService(DataContext context, IMapper mapper, IHttpContextAccessor httpContextAccessor, IEmailService emailService, IFileService fileService, IWebHostEnvironment env)
    {
        _context = context;
        _mapper = mapper;
        _httpContextAccessor = httpContextAccessor;
        _fileService = fileService;
        _emailService = emailService;
        _env = env;

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
            .Include(x => x.FileEntities)
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
    public async Task UploadImage(FileUploadNewDto model)
    {
        if (model.EntityId == null)
        {
            throw new ArgumentException("EntityId is required.");
        }

        try
        {
            // Ensure the ClientId exists in the database
            var clientExists = _context.Clients.Any(c => c.Id == model.EntityId);
            if (!clientExists)
            {
                throw new Exception($"Client with ID {model.EntityId} does not exist.");
            }

            foreach (var file in model.Files)
            {
                bool isImage = file.ContentType.StartsWith("image/");
                string fileDirectory = isImage ? "seed/image/" : "seed/files/";

                // Call SaveFileEntityAsync to save the file and get the created file details
                var createdFileResponse = await _fileService.SaveFileEntityAsync(file, fileDirectory, isImage);

                if (createdFileResponse == null)
                {
                    throw new Exception("File creation failed. The file entity was not properly created.");
                }

                var fileEntity = _context.FileEntities.FirstOrDefault(f => f.FileName == createdFileResponse.FileName && f.FilePath == createdFileResponse.FilePath && f.Id == createdFileResponse.Id);

                if (fileEntity != null)
                {
                    fileEntity.ClientId = model.EntityId.Value;
                    _context.FileEntities.Update(fileEntity);
                }
                else
                {
                    throw new Exception("File entity not found for updating ClientId.");
                }
            }

            // Save changes to the database
            var result = await _context.SaveChangesAsync();
            if (result <= 0)
            {
                throw new Exception("Failed to save file entities to the database.");
            }
        }
        catch (ArgumentException argEx)
        {
            // Handle validation error (e.g., missing EntityId)
            throw new Exception("Validation Error: " + argEx.Message, argEx);
        }
        catch (Exception ex)
        {
            // Log the inner exception if it exists
            if (ex.InnerException != null)
            {
                throw new Exception("Inner exception: " + ex.InnerException.Message, ex.InnerException);
            }
            else
            {
                throw new Exception("Error occurred while uploading the image files: " + ex.Message, ex);
            }
        }
    }


    public async Task SendEmail(SendEmailRequest request)
    {
        if (request == null || string.IsNullOrEmpty(request.Email))
        {
            throw new ArgumentException("Email is required.");
        }

        string subject = "Documents from Karama Business Center";
        string body = "<h1>Here are the documents you requested from Karama Business Center</h1>";

        List<string> filePaths = new List<string>();

        if (request.Files != null && request.Files.Any())
        {
            foreach (var file in request.Files)
            {
                var filePath = Path.Combine(_env.WebRootPath, "seed/files", file.FileName);

                if (File.Exists(filePath))
                {
                    filePaths.Add(filePath);
                }
                else
                {
                    throw new FileNotFoundException($"File {file.FileName} not found on the server.");
                }
            }
        }

        bool emailSent = await _emailService.SendEmailWithAttachmentsAsync(request.Email, subject, body, filePaths);

        if (!emailSent)
        {
            throw new Exception("Failed to send email with attachments.");
        }
    }



    private string GetCurrentUserId()
    {
        return _httpContextAccessor
            .HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value
            ?? null!;
    }

}
