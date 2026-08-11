using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using YourSneaker.Application.DTOs;
using YourSneaker.Application.Interfaces;

namespace YourSneaker.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IProductService _productService;

    public ProductsController(IProductService productService)
    {
        _productService = productService;
    }

    [HttpGet]
    public async Task<IActionResult> GetProducts([FromQuery] ProductQueryParameters parameters)
    {
        var result = await _productService.GetProductsAsync(parameters);
        return Ok(result);
    }

    [HttpGet("featured")]
    public async Task<IActionResult> GetFeaturedProducts()
    {
        var result = await _productService.GetFeaturedProductsAsync();
        return Ok(result);
    }

    [HttpGet("categories")]
    public async Task<IActionResult> GetCategories()
    {
        var result = await _productService.GetCategoriesAsync();
        return Ok(result);
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetProductById(Guid id)
    {
        var result = await _productService.GetProductByIdAsync(id);
        if (!result.Success) return NotFound(result);
        return Ok(result);
    }

    [HttpGet("slug/{slug}")]
    public async Task<IActionResult> GetProductBySlug(string slug)
    {
        var result = await _productService.GetProductBySlugAsync(slug);
        if (!result.Success) return NotFound(result);
        return Ok(result);
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> CreateProduct([FromBody] CreateProductRequest request)
    {
        var result = await _productService.CreateProductAsync(request);
        return CreatedAtAction(nameof(GetProductById), new { id = result.Data?.Id }, result);
    }

    [HttpPut("{id:guid}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> UpdateProduct(Guid id, [FromBody] CreateProductRequest request)
    {
        var result = await _productService.UpdateProductAsync(id, request);
        if (!result.Success) return NotFound(result);
        return Ok(result);
    }

    [HttpDelete("{id:guid}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> DeleteProduct(Guid id)
    {
        var result = await _productService.DeleteProductAsync(id);
        if (!result.Success) return NotFound(result);
        return Ok(result);
    }

    [HttpPost("upload-image")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> UploadImage(IFormFile file)
    {
        if (file == null || file.Length == 0)
        {
            return BadRequest(new { success = false, message = "Vui lòng chọn file hình ảnh hợp lệ." });
        }

        var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".webp", ".gif" };
        var extension = Path.GetExtension(file.FileName).ToLowerInvariant();
        if (!allowedExtensions.Contains(extension))
        {
            return BadRequest(new { success = false, message = "Định dạng file không hỗ trợ. Hãy chọn JPG, PNG, WEBP." });
        }

        var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads", "products");
        if (!Directory.Exists(uploadsFolder))
        {
            Directory.CreateDirectory(uploadsFolder);
        }

        var uniqueFileName = $"{Guid.NewGuid()}{extension}";
        var filePath = Path.Combine(uploadsFolder, uniqueFileName);

        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }

        var imageUrl = $"{Request.Scheme}://{Request.Host}/uploads/products/{uniqueFileName}";
        return Ok(new { success = true, imageUrl, message = "Tải ảnh lên thành công!" });
    }
}
