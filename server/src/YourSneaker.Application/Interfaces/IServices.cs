using YourSneaker.Application.Common;
using YourSneaker.Application.DTOs;
using YourSneaker.Domain.Enums;

namespace YourSneaker.Application.Interfaces;

public interface IAuthService
{
    Task<ApiResponse<AuthResponse>> RegisterAsync(RegisterRequest request);
    Task<ApiResponse<AuthResponse>> LoginAsync(LoginRequest request);
    Task<ApiResponse<AuthResponse>> RefreshTokenAsync(RefreshTokenRequest request);
}

public interface IProductService
{
    Task<ApiResponse<PagedResult<ProductDto>>> GetProductsAsync(ProductQueryParameters parameters);
    Task<ApiResponse<ProductDto>> GetProductByIdAsync(Guid id);
    Task<ApiResponse<ProductDto>> GetProductBySlugAsync(string slug);
    Task<ApiResponse<List<ProductDto>>> GetFeaturedProductsAsync();
    Task<ApiResponse<List<CategoryDto>>> GetCategoriesAsync();
    Task<ApiResponse<ProductDto>> CreateProductAsync(CreateProductRequest request);
    Task<ApiResponse<ProductDto>> UpdateProductAsync(Guid id, CreateProductRequest request);
    Task<ApiResponse<bool>> DeleteProductAsync(Guid id);
}

public interface IOrderService
{
    Task<ApiResponse<OrderDto>> CreateOrderAsync(Guid userId, CreateOrderDto request);
    Task<ApiResponse<List<OrderDto>>> GetMyOrdersAsync(Guid userId);
    Task<ApiResponse<OrderDto>> GetOrderByIdAsync(Guid userId, Guid orderId);
    Task<ApiResponse<List<OrderDto>>> GetAllOrdersAsync(); // Admin
    Task<ApiResponse<OrderDto>> UpdateOrderStatusAsync(Guid orderId, OrderStatus status);
}

public interface IDashboardService
{
    Task<ApiResponse<DashboardStatsDto>> GetDashboardStatsAsync();
}

public interface IVnPayService
{
    string CreatePaymentUrl(OrderDto order, string clientIpAddress);
    Task<ApiResponse<OrderDto>> ProcessPaymentReturnAsync(Dictionary<string, string> vnPayData);
}

public interface IJwtTokenGenerator
{
    string GenerateAccessToken(Domain.Entities.User user);
    string GenerateRefreshToken();
}
