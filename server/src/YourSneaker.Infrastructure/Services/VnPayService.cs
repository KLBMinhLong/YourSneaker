using System.Globalization;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using YourSneaker.Application.Common;
using YourSneaker.Application.DTOs;
using YourSneaker.Application.Interfaces;
using YourSneaker.Domain.Enums;
using YourSneaker.Infrastructure.Persistence;

namespace YourSneaker.Infrastructure.Services;

public class VnPayService : IVnPayService
{
    private readonly IConfiguration _config;
    private readonly AppDbContext _context;

    public VnPayService(IConfiguration config, AppDbContext context)
    {
        _config = config;
        _context = context;
    }

    public string CreatePaymentUrl(OrderDto order, string clientIpAddress)
    {
        var vnp_Url = _config["VnPay:BaseUrl"] ?? "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
        var vnp_TmnCode = _config["VnPay:TmnCode"] ?? "DEMOVNP1";
        var vnp_HashSecret = _config["VnPay:HashSecret"] ?? "YOURVNPAYSECRETKEY1234567890";
        var vnp_ReturnUrl = _config["VnPay:ReturnUrl"] ?? "http://localhost:5173/payment-return";

        var vnpayData = new SortedList<string, string>(new VnPayCompare());
        vnpayData.Add("vnp_Version", "2.1.0");
        vnpayData.Add("vnp_Command", "pay");
        vnpayData.Add("vnp_TmnCode", vnp_TmnCode);
        vnpayData.Add("vnp_Amount", ((long)(order.TotalAmount * 100)).ToString()); // VNPay amount in VND * 100
        vnpayData.Add("vnp_CreateDate", DateTime.UtcNow.AddHours(7).ToString("yyyyMMddHHmmss"));
        vnpayData.Add("vnp_CurrCode", "VND");
        vnpayData.Add("vnp_IpAddr", string.IsNullOrEmpty(clientIpAddress) ? "127.0.0.1" : clientIpAddress);
        vnpayData.Add("vnp_Locale", "vn");
        vnpayData.Add("vnp_OrderInfo", $"Thanh toan don hang {order.OrderCode}");
        vnpayData.Add("vnp_OrderType", "other");
        vnpayData.Add("vnp_ReturnUrl", vnp_ReturnUrl);
        vnpayData.Add("vnp_TxnRef", order.Id.ToString());

        var queryData = new StringBuilder();
        var rawData = new StringBuilder();

        foreach (var (key, value) in vnpayData)
        {
            if (!string.IsNullOrEmpty(value))
            {
                rawData.Append(WebUtility.UrlEncode(key) + "=" + WebUtility.UrlEncode(value) + "&");
                queryData.Append(WebUtility.UrlEncode(key) + "=" + WebUtility.UrlEncode(value) + "&");
            }
        }

        var rawDataStr = rawData.ToString().TrimEnd('&');
        var queryStr = queryData.ToString().TrimEnd('&');

        var vnp_SecureHash = HmacSHA512(vnp_HashSecret, rawDataStr);
        var paymentUrl = $"{vnp_Url}?{queryStr}&vnp_SecureHash={vnp_SecureHash}";

        return paymentUrl;
    }

    public async Task<ApiResponse<OrderDto>> ProcessPaymentReturnAsync(Dictionary<string, string> vnPayData)
    {
        var vnp_HashSecret = _config["VnPay:HashSecret"] ?? "YOURVNPAYSECRETKEY1234567890";
        var vnp_SecureHash = vnPayData.GetValueOrDefault("vnp_SecureHash") ?? "";

        var sortedData = new SortedList<string, string>(new VnPayCompare());
        foreach (var (key, value) in vnPayData)
        {
            if (!string.IsNullOrEmpty(key) && key.StartsWith("vnp_") && key != "vnp_SecureHash" && key != "vnp_SecureHashType")
            {
                sortedData.Add(key, value);
            }
        }

        var rawData = new StringBuilder();
        foreach (var (key, value) in sortedData)
        {
            if (!string.IsNullOrEmpty(value))
            {
                rawData.Append(WebUtility.UrlEncode(key) + "=" + WebUtility.UrlEncode(value) + "&");
            }
        }
        var rawDataStr = rawData.ToString().TrimEnd('&');
        var checkSum = HmacSHA512(vnp_HashSecret, rawDataStr);

        var txnRef = vnPayData.GetValueOrDefault("vnp_TxnRef");
        var responseCode = vnPayData.GetValueOrDefault("vnp_ResponseCode");

        if (!Guid.TryParse(txnRef, out var orderId))
        {
            return ApiResponse<OrderDto>.Fail("Mã giao dịch không hợp lệ.");
        }

        var order = await _context.Orders
            .Include(o => o.OrderItems)
            .ThenInclude(oi => oi.Product)
            .FirstOrDefaultAsync(o => o.Id == orderId);

        if (order == null)
        {
            return ApiResponse<OrderDto>.Fail("Không tìm thấy đơn hàng.");
        }

        if (responseCode == "00")
        {
            order.IsPaid = true;
            order.Status = OrderStatus.Processing;
            order.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            var dto = MapToDto(order);
            return ApiResponse<OrderDto>.Ok(dto, "Thanh toán VNPay thành công!");
        }

        return ApiResponse<OrderDto>.Fail($"Thanh toán VNPay thất bại hoặc bị hủy (Mã lỗi: {responseCode}).");
    }

    private static string HmacSHA512(string key, string inputData)
    {
        var hash = new StringBuilder();
        var keyBytes = Encoding.UTF8.GetBytes(key);
        var inputBytes = Encoding.UTF8.GetBytes(inputData);
        using var hmac = new HMACSHA512(keyBytes);
        var hashBytes = hmac.ComputeHash(inputBytes);
        foreach (var b in hashBytes)
        {
            hash.Append(b.ToString("x2"));
        }
        return hash.ToString();
    }

    private static OrderDto MapToDto(Domain.Entities.Order order)
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

public class VnPayCompare : IComparer<string>
{
    public int Compare(string? x, string? y)
    {
        if (x == y) return 0;
        if (x == null) return -1;
        if (y == null) return 1;
        var vnpCompare = CompareInfo.GetCompareInfo("en-US");
        return vnpCompare.Compare(x, y, CompareOptions.Ordinal);
    }
}
