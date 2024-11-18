using API.DTOs.ServiceDto;
using API.Interfaces;
using API.RequestParams;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoriesController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        // GET: api/categories
        [HttpGet]
        public async Task<ActionResult<List<CategoryDto>>> GetAllCategories([FromQuery] CategoryParams CategorytParams)
        {
            var categories = await _categoryService.GetAllCategoriesAsync(CategorytParams);
            return Ok(categories);
        }
        [HttpGet("getAllForDropdown")]
        public async Task<IActionResult> GetAllAuthoritiesForDropdown()
        {
            return Ok(await _categoryService.GetAllCategoriesForDropdownAsync());
        }

        // GET: api/categories/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<CategoryDto>> GetCategoryById(Guid id)
        {
            try
            {
                var category = await _categoryService.GetCategoryByIdAsync(id);
                return Ok(category);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }



        // POST: api/categories
        [HttpPost]
        public async Task<ActionResult<CategoryDto>> AddCategory([FromForm] CategorySaveDto categorySaveDto)
        {
            try
            {
                var createdCategory = await _categoryService.AddCategoryAsync(categorySaveDto, categorySaveDto.pictureFile);
                return CreatedAtAction(nameof(GetCategoryById), new { id = createdCategory.Id }, createdCategory);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // DELETE: api/categories/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(Guid id)
        {
            try
            {
                await _categoryService.DeleteCategoryAsync(id);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }

}


//[HttpPost]
//public async Task<IActionResult> CreateCategory([FromForm] CategorySaveDto categoryDto, IFormFile? pictureFile)
//{
//    if (pictureFile != null)
//    {
//        // Ensure you save it to a directory accessible publicly, like wwwroot
//        var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", pictureFile.FileName);
//        using (var stream = new FileStream(filePath, FileMode.Create))
//        {
//            await pictureFile.CopyToAsync(stream);
//        }
//        categoryDto.PictureUrl = "/images/" + pictureFile.FileName;
//    }

//    // Save category to the database
//    // Assuming your category save logic and DTO are set up properly
//    var category = new Category
//    {
//        Name = categoryDto.Name,
//        PictureUrl = categoryDto.PictureUrl
//    };

//    _context.Categories.Add(category);
//    await _context.SaveChangesAsync();

//    return Ok(new { id = category.Id, pictureUrl = category.PictureUrl });
//}
