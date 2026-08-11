using Microsoft.AspNetCore.Mvc;
using YourSneaker.Application.Interfaces;

namespace YourSneaker.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly IProductService _productService;

    public CategoriesController(IProductService productService)
    {
        _productService = productService;
    }

    [HttpGet]
    public async Task<IActionResult> GetCategories()
    {
        var result = await _productService.GetCategoriesAsync();
        return Ok(result);
    }
}
