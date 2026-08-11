namespace YourSneaker.Application.DTOs;

public record TopSellingProductDto(
    Guid ProductId,
    string ProductName,
    string ProductImageUrl,
    decimal Price,
    int TotalQuantitySold,
    decimal TotalRevenue
);

public record DashboardStatsDto(
    decimal TotalRevenue,
    int TotalOrders,
    int TotalProducts,
    int TotalCustomers,
    List<OrderDto> RecentOrders,
    List<TopSellingProductDto> TopSellingProducts
);
