using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using YourSneaker.Application.DTOs;
using YourSneaker.Application.Interfaces;

namespace YourSneaker.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PaymentController : ControllerBase
{
    private readonly IVnPayService _vnPayService;
    private readonly IOrderService _orderService;

    public PaymentController(IVnPayService vnPayService, IOrderService orderService)
    {
        _vnPayService = vnPayService;
        _orderService = orderService;
    }

    [HttpPost("create-vnpay-url")]
    [Authorize]
    public async Task<IActionResult> CreatePaymentUrl([FromBody] CreatePaymentUrlRequest request)
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userIdClaim) || !Guid.TryParse(userIdClaim, out var userId))
        {
            return Unauthorized();
        }

        var orderResult = await _orderService.GetOrderByIdAsync(userId, request.OrderId);
        if (!orderResult.Success || orderResult.Data == null)
        {
            return BadRequest(orderResult);
        }

        var clientIp = HttpContext.Connection.RemoteIpAddress?.ToString() ?? "127.0.0.1";
        var paymentUrl = _vnPayService.CreatePaymentUrl(orderResult.Data, clientIp);

        return Ok(new PaymentResponseDto(true, paymentUrl, "Tạo đường dẫn thanh toán VNPay thành công."));
    }

    [HttpGet("vnpay-return")]
    public async Task<IActionResult> VnPayReturn()
    {
        var vnPayData = HttpContext.Request.Query.ToDictionary(q => q.Key, q => q.Value.ToString());
        var result = await _vnPayService.ProcessPaymentReturnAsync(vnPayData);
        return Ok(result);
    }
}
