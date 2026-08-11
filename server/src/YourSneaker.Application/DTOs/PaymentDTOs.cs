namespace YourSneaker.Application.DTOs;

public record CreatePaymentUrlRequest(
    Guid OrderId
);

public record PaymentResponseDto(
    bool Success,
    string PaymentUrl,
    string Message
);

public record VnPayCallbackDto(
    string vnp_ResponseCode,
    string vnp_TxnRef,
    string vnp_Amount,
    string vnp_OrderInfo,
    string vnp_SecureHash
);
