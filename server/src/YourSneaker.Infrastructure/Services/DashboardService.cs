using Microsoft.EntityFrameworkCore;
using YourSneaker.Application.Common;
using YourSneaker.Application.DTOs;
using YourSneaker.Application.Interfaces;
using YourSneaker.Infrastructure.Persistence;

namespace YourSneaker.Infrastructure.Services;

public class DashboardService : IDashboardService
{
    private readonly AppDbContext _context;

    public DashboardService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<ApiResponse<DashboardStatsDto>> GetDashboardStatsAsync()
    {
        var totalRevenue = await _context.Orders.SumAsync(o => o.TotalAmount);
        var totalOrders = await _context.Orders.CountAsync();
        var totalProducts = await _context.Products.CountAsync();
        var totalCustomers = await _context.Users.CountAsync(u => u.Role == YourSneaker.Domain.Enums.UserRole.Customer);

        var recentOrdersRaw = await _context.Orders
            .Include(o => o.OrderItems)
            .ThenInclude(oi => oi.Product)
            .OrderByDescending(o => o.CreatedAt)
            .Take(5)
            .ToListAsync();

        var recentOrders = recentOrdersRaw.Select(o => new OrderDto(
            o.Id,
            o.OrderCode,
            o.UserId,
            o.CustomerName,
            o.CustomerPhone,
            o.ShippingAddress,
            o.Note,
            o.TotalAmount,
            o.Status,
            o.PaymentMethod,
            o.IsPaid,
            o.CreatedAt,
            o.OrderItems.Select(oi => new OrderItemDto(
                oi.Id,
                oi.ProductId,
                oi.Product?.Name ?? "Sản phẩm",
                oi.Product?.ImageUrl ?? "",
                oi.SelectedSize,
                oi.Quantity,
                oi.UnitPrice,
                oi.TotalPrice
            )).ToList()
        )).ToList();

        var topSellingItems = await _context.OrderItems
            .Include(oi => oi.Product)
            .GroupBy(oi => oi.ProductId)
            .Select(g => new
            {
                ProductId = g.Key,
                TotalQuantitySold = g.Sum(x => x.Quantity),
                TotalRevenue = g.Sum(x => x.UnitPrice * x.Quantity),
                Product = g.FirstOrDefault()!.Product
            })
            .OrderByDescending(x => x.TotalQuantitySold)
            .Take(5)
            .ToListAsync();

        var topProducts = topSellingItems.Select(x => new TopSellingProductDto(
            x.ProductId,
            x.Product?.Name ?? "Sản phẩm",
            x.Product?.ImageUrl ?? "",
            x.Product?.Price ?? 0,
            x.TotalQuantitySold,
            x.TotalRevenue
        )).ToList();

        var stats = new DashboardStatsDto(
            totalRevenue,
            totalOrders,
            totalProducts,
            totalCustomers,
            recentOrders,
            topProducts
        );

        return ApiResponse<DashboardStatsDto>.Ok(stats);
    }
}
