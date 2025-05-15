using System.Security.Claims;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using API.RequestParams;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

public class BlogService : IBlogService
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;
    private readonly IHttpContextAccessor _httpContextAccessor;

    private readonly IFileService _fileService;


    public BlogService(DataContext context, IMapper mapper,
        IHttpContextAccessor httpContextAccessor, IFileService fileService)
    {
        _context = context;
        _mapper = mapper;
        _fileService = fileService;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task<PagedList<BlogDetailsDto>> GetAllBlogsAsync(BlogParams blogParams)
    {
        var query =
            _context.Blogs
            .Include(x => x.CreatedBy)
            .Where(x => !x.IsDeleted)
            .AsNoTracking()
            .OrderByDescending(x => x.CreateDate)
                .AsQueryable();

        if (!string.IsNullOrWhiteSpace(blogParams.SearchTerm))
        {
            var searchTerm = blogParams.SearchTerm.Trim().ToLower();
            query = query.Where(x => x.BlogTitle.ToLower().Contains(searchTerm) ||
                (!string.IsNullOrEmpty(x.BlogContent) && x.BlogContent.ToLower().Contains(searchTerm))
                );
        }


        return await PagedList<BlogDetailsDto>.CreateAsync(
           query.ProjectTo<BlogDetailsDto>(_mapper.ConfigurationProvider),
           blogParams.PageNumber,
           blogParams.PageSize);

    }



    public async Task<string> UploadImage(FileUploadNewDto model)
    {
        var blog = await _context.Blogs
            .Include(x => x.FileEntities)
            .FirstOrDefaultAsync(x => x.Id == model.EntityId);

        if (blog == null) return null!;

        if (blog.FileEntities?.Count > 0 && model.number != null)
        {
            var fileEntitiesList = blog.FileEntities.ToList();

            if (model.Files.Count == 1 &&
              int.TryParse(model.number, out var number) &&
              number > 0 &&
              blog.FileEntities.Count >= number)
            {
                var updatedFile = await _fileService.UpdateFileAsync(
                fileEntitiesList[Convert.ToInt32(model.number) - 1].Id, // Convert model.number to an integer
                model.Files[0],
                model.directory,
                isImage: true
            );
                var fileEntity = await _fileService.GetFileByIdAsync(updatedFile.Id);
                fileEntity.BlogId = model.EntityId;
            }
            else
            {

                for (int i = 0; i < model.Files.Count; i++)
                {
                    if (i < fileEntitiesList.Count &&
                         int.TryParse(model.number, out var num) &&
                         num > 0 &&
                         blog?.FileEntities?.Count >= num)
                    {

                        var updatedFile = await _fileService.UpdateFileAsync(
                            fileEntitiesList[i].Id,
                            model.Files[i],
                            model.directory,
                            isImage: true
                        );
                        var fileEntity = await _fileService.GetFileByIdAsync(updatedFile.Id);
                        fileEntity.BlogId = model.EntityId;
                    }
                    else
                    {
                        var newFileDto = await _fileService.SaveFileEntityAsync(
                            model.Files[i],
                            model.directory,
                            isImage: true
                        );
                        var newFileEntity = new FileEntity
                        {
                            Id = newFileDto.Id,
                            FileName = newFileDto.FileName ?? "",
                            FilePath = newFileDto.FilePath ?? "",
                            ContentType = newFileDto.ContentType ?? "",
                            Size = newFileDto.Size,
                            BlogId = model.EntityId,
                            CreateDate = TimeHelper.GetCurrentTimeInAbuDhabi(),
                            CreatedById = GetCurrentUserId()
                        };

                        blog?.FileEntities?.Add(newFileEntity);

                    }

                }
            }
        }
        else
        {
            foreach (var file in model.Files)
            {
                var createdFile = await _fileService.SaveFileEntityAsync(file, model.directory, isImage: true);

                var newFileEntity = new FileEntity
                {
                    Id = createdFile.Id,
                    FileName = createdFile.FileName ?? "",
                    FilePath = createdFile.FilePath ?? "",
                    ContentType = createdFile.ContentType ?? "",
                    Size = createdFile.Size,
                    BlogId = model.EntityId,
                    CreateDate = TimeHelper.GetCurrentTimeInAbuDhabi(),
                    CreatedById = GetCurrentUserId()
                };

                // Detach the new entity if already tracked
                var trackedEntity = _context.ChangeTracker.Entries<FileEntity>()
                    .FirstOrDefault(e => e.Entity.Id == newFileEntity.Id);

                if (trackedEntity != null)
                {
                    _context.Entry(trackedEntity.Entity).State = EntityState.Detached;
                }

                blog?.FileEntities?.Add(newFileEntity);
            }

        }

        await _context.SaveChangesAsync();

        return blog?.FileEntities?.FirstOrDefault()?.FilePath ?? "assets/img/Amer Services.png";
    }


    public async Task<string> UploadImageForPost(FileUploadNewDto model)
    {
        var post = await _context.Posts
            .Include(x => x.FileEntities)
            .FirstOrDefaultAsync(x => x.Id == model.EntityId);

        if (post == null) return null!;

        if (post.FileEntities?.Count > 0 && model.number != null)
        {
            var fileEntitiesList = post.FileEntities.ToList();

            if (model.Files.Count == 1 &&
              int.TryParse(model.number, out var number) &&
              number > 0 &&
              post.FileEntities.Count >= number)
            {
                var updatedFile = await _fileService.UpdateFileAsync(
                fileEntitiesList[Convert.ToInt32(model.number) - 1].Id, // Convert model.number to an integer
                model.Files[0],
                model.directory,
                isImage: true
            );
                var fileEntity = await _fileService.GetFileByIdAsync(updatedFile.Id);
                fileEntity.PostId = model.EntityId;
            }
            else
            {

                for (int i = 0; i < model.Files.Count; i++)
                {
                    if (i < fileEntitiesList.Count &&
                         int.TryParse(model.number, out var num) &&
                         num > 0 &&
                         post?.FileEntities?.Count >= num)
                    {

                        var updatedFile = await _fileService.UpdateFileAsync(
                            fileEntitiesList[i].Id,
                            model.Files[i],
                            model.directory,
                            isImage: true
                        );
                        var fileEntity = await _fileService.GetFileByIdAsync(updatedFile.Id);
                        fileEntity.PostId = model.EntityId;
                    }
                    else
                    {
                        var newFileDto = await _fileService.SaveFileEntityAsync(
                            model.Files[i],
                            model.directory,
                            isImage: true
                        );
                        var newFileEntity = new FileEntity
                        {
                            Id = newFileDto.Id,
                            FileName = newFileDto.FileName ?? "",
                            FilePath = newFileDto.FilePath ?? "",
                            ContentType = newFileDto.ContentType ?? "",
                            Size = newFileDto.Size,
                            PostId = model.EntityId,
                            CreateDate = TimeHelper.GetCurrentTimeInAbuDhabi(),
                            CreatedById = GetCurrentUserId()
                        };

                        post?.FileEntities?.Add(newFileEntity);

                    }

                }
            }
        }
        else
        {
            foreach (var file in model.Files)
            {
                var createdFile = await _fileService.SaveFileEntityAsync(file, model.directory, isImage: true);

                var newFileEntity = new FileEntity
                {
                    Id = createdFile.Id,
                    FileName = createdFile.FileName ?? "",
                    FilePath = createdFile.FilePath ?? "",
                    ContentType = createdFile.ContentType ?? "",
                    Size = createdFile.Size,
                    PostId = model.EntityId,
                    CreateDate = TimeHelper.GetCurrentTimeInAbuDhabi(),
                    CreatedById = GetCurrentUserId()
                };

                // Detach the new entity if already tracked
                var trackedEntity = _context.ChangeTracker.Entries<FileEntity>()
                    .FirstOrDefault(e => e.Entity.Id == newFileEntity.Id);

                if (trackedEntity != null)
                {
                    _context.Entry(trackedEntity.Entity).State = EntityState.Detached;
                }

                post?.FileEntities?.Add(newFileEntity);
            }

        }

        await _context.SaveChangesAsync();

        return post?.FileEntities?.FirstOrDefault()?.FilePath ?? "assets/img/Amer Services.png";
    }




    public async Task<BlogDetailsDto> GetBlogByIdAsync(Guid id)
    {
        var blog = await _context.Blogs
     .Include(b => b.Posts)
         .ThenInclude(p => p.PostSections)
     .Include(b => b.Posts)
         .ThenInclude(p => p.FileEntities)
     .FirstOrDefaultAsync(b => b.Id == id);

        if (blog == null)
        {
            throw new KeyNotFoundException($"blog with id {id} not found.");
        }
        return _mapper.Map<BlogDetailsDto>(blog);
    }

    public async Task<BlogDetailsDto> AddBlogAsync(BlogSaveDto model)
    {
        if (await _context.Blogs.AnyAsync(x => x.BlogTitle == model.BlogTitle))
        {
            throw new Exception("Blog already exists.");
        }

        var blog = _mapper.Map<Blog>(model);

        blog.CreateDate = TimeHelper.GetCurrentTimeInAbuDhabi();
        blog.CreatedById = GetCurrentUserId();

        _context.Blogs.Add(blog);

        await _context.SaveChangesAsync();

        return _mapper.Map<BlogDetailsDto>(blog);
    }

    public async Task DeleteBlogAsync(Guid id)
    {
        var blog = await _context.Blogs.FindAsync(id);

        if (blog == null)
        {
            throw new KeyNotFoundException($"Blog with id {id} not found.");
        }
        blog.IsDeleted = true;
        var result = await _context.SaveChangesAsync() > 0;

        if (!result)
        {
            throw new Exception("Failed to delete the Blog.");
        }
    }

    private string GetCurrentUserId()
    {
        return _httpContextAccessor
            .HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value
                ?? null!;
    }

}
