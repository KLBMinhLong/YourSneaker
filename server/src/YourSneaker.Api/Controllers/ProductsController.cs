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
}
