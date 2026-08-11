using Microsoft.EntityFrameworkCore;
using YourSneaker.Application.Common;
using YourSneaker.Application.DTOs;
using YourSneaker.Application.Interfaces;
using YourSneaker.Domain.Entities;
using YourSneaker.Domain.Enums;
using YourSneaker.Infrastructure.Persistence;

namespace YourSneaker.Infrastructure.Services;

public class OrderService : IOrderService
{
    private readonly AppDbContext _context;

    public OrderService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<ApiResponse<OrderDto>> CreateOrderAsync(Guid userId, CreateOrderDto request)
    {
        if (request.Items == null || !request.Items.Any())
        {
            return ApiResponse<OrderDto>.Fail("Giỏ hàng của bạn đang trống.");
        }

        var productIds = request.Items.Select(i => i.ProductId).Distinct().ToList();
        var products = await _context.Products
            .Where(p => productIds.Contains(p.Id))
            .ToDictionaryAsync(p => p.Id);

        // Validate products stock
        foreach (var item in request.Items)
        {
            if (!products.TryGetValue(item.ProductId, out var product))
            {
                return ApiResponse<OrderDto>.Fail($"Sản phẩm với ID {item.ProductId} không tồn tại.");
            }

            if (product.Stock < item.Quantity)
            {
                return ApiResponse<OrderDto>.Fail($"Sản phẩm '{product.Name}' không đủ số lượng tồn kho (Còn lại: {product.Stock}).");
            }
        }

        var orderCode = $"YS-{DateTime.UtcNow:yyyyMMdd}-{Random.Shared.Next(1000, 9999)}";
        var order = new Order
        {
            OrderCode = orderCode,
            UserId = userId,
            CustomerName = request.CustomerName,
            CustomerPhone = request.CustomerPhone,
            ShippingAddress = request.ShippingAddress,
            Note = request.Note,
            PaymentMethod = request.PaymentMethod,
            Status = OrderStatus.Pending,
            IsPaid = request.PaymentMethod == PaymentMethod.VNPay,
            CreatedAt = DateTime.UtcNow,
            TotalAmount = 0
        };

        decimal totalAmount = 0;

        foreach (var item in request.Items)
        {
            var product = products[item.ProductId];
            
            // Deduct stock
            product.Stock -= item.Quantity;

            var orderItem = new OrderItem
            {
                OrderId = order.Id,
                ProductId = product.Id,
                SelectedSize = item.SelectedSize,
                Quantity = item.Quantity,
                UnitPrice = product.Price
            };

            totalAmount += orderItem.TotalPrice;
            order.OrderItems.Add(orderItem);
        }

        order.TotalAmount = totalAmount;

        _context.Orders.Add(order);
        await _context.SaveChangesAsync();

        return ApiResponse<OrderDto>.Ok(MapToDto(order), "Đặt hàng thành công!");
    }

    public async Task<ApiResponse<List<OrderDto>>> GetMyOrdersAsync(Guid userId)
    {
        var orders = await _context.Orders
            .Include(o => o.OrderItems)
            .ThenInclude(oi => oi.Product)
            .Where(o => o.UserId == userId)
            .OrderByDescending(o => o.CreatedAt)
            .ToListAsync();

        var result = orders.Select(MapToDto).ToList();
        return ApiResponse<List<OrderDto>>.Ok(result);
    }

    public async Task<ApiResponse<OrderDto>> GetOrderByIdAsync(Guid userId, Guid orderId)
    {
        var order = await _context.Orders
            .Include(o => o.OrderItems)
            .ThenInclude(oi => oi.Product)
            .FirstOrDefaultAsync(o => o.Id == orderId && o.UserId == userId);

        if (order == null)
        {
            return ApiResponse<OrderDto>.Fail("Không tìm thấy đơn hàng.");
        }

        return ApiResponse<OrderDto>.Ok(MapToDto(order));
    }

    public async Task<ApiResponse<List<OrderDto>>> GetAllOrdersAsync()
    {
        var orders = await _context.Orders
            .Include(o => o.OrderItems)
            .ThenInclude(oi => oi.Product)
            .OrderByDescending(o => o.CreatedAt)
            .ToListAsync();

        var result = orders.Select(MapToDto).ToList();
        return ApiResponse<List<OrderDto>>.Ok(result);
    }

    public async Task<ApiResponse<OrderDto>> UpdateOrderStatusAsync(Guid orderId, OrderStatus status)
    {
        var order = await _context.Orders
            .Include(o => o.OrderItems)
            .ThenInclude(oi => oi.Product)
            .FirstOrDefaultAsync(o => o.Id == orderId);

        if (order == null)
        {
            return ApiResponse<OrderDto>.Fail("Không tìm thấy đơn hàng.");
        }

        order.Status = status;
        order.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();
        return ApiResponse<OrderDto>.Ok(MapToDto(order), "Cập nhật trạng thái đơn hàng thành công.");
    }

    private static OrderDto MapToDto(Order order)
    {
        return new OrderDto(
            order.Id,
            order.OrderCode,
            order.UserId,
            order.CustomerName,
            order.CustomerPhone,
            order.ShippingAddress,
            order.Note,
            order.TotalAmount,
            order.Status,
            order.PaymentMethod,
            order.IsPaid,
            order.CreatedAt,
            order.OrderItems.Select(oi => new OrderItemDto(
                oi.Id,
                oi.ProductId,
                oi.Product?.Name ?? "Sản phẩm",
                oi.Product?.ImageUrl ?? "",
                oi.SelectedSize,
                oi.Quantity,
                oi.UnitPrice,
                oi.TotalPrice
            )).ToList()
        );
    }
}
