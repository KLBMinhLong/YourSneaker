using Microsoft.EntityFrameworkCore;
using YourSneaker.Application.Common;
using YourSneaker.Application.DTOs;
using YourSneaker.Application.Interfaces;
using YourSneaker.Domain.Entities;
using YourSneaker.Infrastructure.Persistence;

namespace YourSneaker.Infrastructure.Services;

public class ProductService : IProductService
{
    private readonly AppDbContext _context;

    public ProductService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<ApiResponse<PagedResult<ProductDto>>> GetProductsAsync(ProductQueryParameters parameters)
    {
        var query = _context.Products.Include(p => p.Category).AsQueryable();

        if (!string.IsNullOrWhiteSpace(parameters.Search))
        {
            var search = parameters.Search.ToLower().Trim();
            query = query.Where(p => p.Name.ToLower().Contains(search) || p.Brand.ToLower().Contains(search));
        }

        if (parameters.CategoryId.HasValue)
        {
            query = query.Where(p => p.CategoryId == parameters.CategoryId.Value);
        }

        if (!string.IsNullOrWhiteSpace(parameters.Brand))
        {
            query = query.Where(p => p.Brand.ToLower() == parameters.Brand.ToLower().Trim());
        }

        if (parameters.MinPrice.HasValue)
        {
            query = query.Where(p => p.Price >= parameters.MinPrice.Value);
        }

        if (parameters.MaxPrice.HasValue)
        {
            query = query.Where(p => p.Price <= parameters.MaxPrice.Value);
        }

        query = parameters.SortBy?.ToLower() switch
        {
            "price_asc" => query.OrderBy(p => p.Price),
            "price_desc" => query.OrderByDescending(p => p.Price),
            "popular" => query.OrderByDescending(p => p.ReviewCount),
            _ => query.OrderByDescending(p => p.CreatedAt)
        };

        var totalItems = await query.CountAsync();
        var items = await query
            .Skip((parameters.Page - 1) * parameters.PageSize)
            .Take(parameters.PageSize)
            .Select(p => MapToDto(p))
            .ToListAsync();

        var result = new PagedResult<ProductDto>
        {
            Items = items,
            Page = parameters.Page,
            PageSize = parameters.PageSize,
            TotalItems = totalItems
        };

        return ApiResponse<PagedResult<ProductDto>>.Ok(result);
    }

    public async Task<ApiResponse<ProductDto>> GetProductByIdAsync(Guid id)
    {
        var product = await _context.Products.Include(p => p.Category).FirstOrDefaultAsync(p => p.Id == id);
        if (product == null) return ApiResponse<ProductDto>.Fail("Không tìm thấy sản phẩm.");

        return ApiResponse<ProductDto>.Ok(MapToDto(product));
    }

    public async Task<ApiResponse<ProductDto>> GetProductBySlugAsync(string slug)
    {
        var product = await _context.Products.Include(p => p.Category).FirstOrDefaultAsync(p => p.Slug == slug);
        if (product == null) return ApiResponse<ProductDto>.Fail("Không tìm thấy sản phẩm.");

        return ApiResponse<ProductDto>.Ok(MapToDto(product));
    }

    public async Task<ApiResponse<List<ProductDto>>> GetFeaturedProductsAsync()
    {
        var products = await _context.Products
            .Include(p => p.Category)
            .Where(p => p.IsFeatured)
            .Take(6)
            .Select(p => MapToDto(p))
            .ToListAsync();

        return ApiResponse<List<ProductDto>>.Ok(products);
    }

    public async Task<ApiResponse<List<CategoryDto>>> GetCategoriesAsync()
    {
        var categories = await _context.Categories
            .Select(c => new CategoryDto
            {
                Id = c.Id,
                Name = c.Name,
                Slug = c.Slug,
                Description = c.Description,
                ImageUrl = c.ImageUrl,
                ProductCount = c.Products.Count
            })
            .ToListAsync();

        return ApiResponse<List<CategoryDto>>.Ok(categories);
    }

    public async Task<ApiResponse<ProductDto>> CreateProductAsync(CreateProductRequest request)
    {
        var slug = request.Name.ToLower().Replace(" ", "-").Replace("'", "");
        var product = new Product
        {
            Id = Guid.NewGuid(),
            Name = request.Name,
            Slug = slug,
            Description = request.Description,
            Price = request.Price,
            OriginalPrice = request.OriginalPrice,
            Stock = request.Stock,
            ImageUrl = request.ImageUrl,
            Brand = request.Brand,
            CategoryId = request.CategoryId,
            IsFeatured = request.IsFeatured,
            IsNewRelease = request.IsNewRelease,
            CreatedAt = DateTime.UtcNow
        };

        await _context.Products.AddAsync(product);
        await _context.SaveChangesAsync();

        var created = await _context.Products.Include(p => p.Category).FirstAsync(p => p.Id == product.Id);
        return ApiResponse<ProductDto>.Ok(MapToDto(created), "Tạo sản phẩm thành công!");
    }

    public async Task<ApiResponse<ProductDto>> UpdateProductAsync(Guid id, CreateProductRequest request)
    {
        var product = await _context.Products.Include(p => p.Category).FirstOrDefaultAsync(p => p.Id == id);
        if (product == null) return ApiResponse<ProductDto>.Fail("Không tìm thấy sản phẩm.");

        product.Name = request.Name;
        product.Slug = request.Name.ToLower().Replace(" ", "-").Replace("'", "");
        product.Description = request.Description;
        product.Price = request.Price;
        product.OriginalPrice = request.OriginalPrice;
        product.Stock = request.Stock;
        product.ImageUrl = request.ImageUrl;
        product.Brand = request.Brand;
        product.CategoryId = request.CategoryId;
        product.IsFeatured = request.IsFeatured;
        product.IsNewRelease = request.IsNewRelease;

        await _context.SaveChangesAsync();
        return ApiResponse<ProductDto>.Ok(MapToDto(product), "Cập nhật sản phẩm thành công!");
    }

    public async Task<ApiResponse<bool>> DeleteProductAsync(Guid id)
    {
        var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == id);
        if (product == null) return ApiResponse<bool>.Fail("Không tìm thấy sản phẩm.");

        _context.Products.Remove(product);
        await _context.SaveChangesAsync();

        return ApiResponse<bool>.Ok(true, "Xóa sản phẩm thành công!");
    }

    private static ProductDto MapToDto(Product p) => new()
    {
        Id = p.Id,
        Name = p.Name,
        Slug = p.Slug,
        Description = p.Description,
        Price = p.Price,
        OriginalPrice = p.OriginalPrice,
        Stock = p.Stock,
        ImageUrl = p.ImageUrl,
        Brand = p.Brand,
        IsFeatured = p.IsFeatured,
        IsNewRelease = p.IsNewRelease,
        Rating = p.Rating,
        ReviewCount = p.ReviewCount,
        CategoryId = p.CategoryId,
        CategoryName = p.Category?.Name ?? string.Empty
    };
}
