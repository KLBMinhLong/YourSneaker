using YourSneaker.Domain.Enums;

namespace YourSneaker.Application.DTOs;

public record CreateOrderItemDto(
    Guid ProductId,
    string SelectedSize,
    int Quantity
);

public record CreateOrderDto(
    string CustomerName,
    string CustomerPhone,
    string ShippingAddress,
    string? Note,
    PaymentMethod PaymentMethod,
    List<CreateOrderItemDto> Items
);

public record OrderItemDto(
    Guid Id,
    Guid ProductId,
    string ProductName,
    string ProductImageUrl,
    string SelectedSize,
    int Quantity,
    decimal UnitPrice,
    decimal TotalPrice
);

public record OrderDto(
    Guid Id,
    string OrderCode,
    Guid UserId,
    string CustomerName,
    string CustomerPhone,
    string ShippingAddress,
    string? Note,
    decimal TotalAmount,
    OrderStatus Status,
    PaymentMethod PaymentMethod,
    bool IsPaid,
    DateTime CreatedAt,
    List<OrderItemDto> Items
);

public record UpdateOrderStatusDto(
    OrderStatus Status
);
