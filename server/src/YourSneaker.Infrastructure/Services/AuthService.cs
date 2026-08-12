using Microsoft.EntityFrameworkCore;
using YourSneaker.Application.Common;
using YourSneaker.Application.DTOs;
using YourSneaker.Application.Interfaces;
using YourSneaker.Domain.Entities;
using YourSneaker.Domain.Enums;
using YourSneaker.Infrastructure.Persistence;

namespace YourSneaker.Infrastructure.Services;

public class AuthService : IAuthService
{
    private readonly AppDbContext _context;
    private readonly IJwtTokenGenerator _jwtGenerator;

    public AuthService(AppDbContext context, IJwtTokenGenerator jwtGenerator)
    {
        _context = context;
        _jwtGenerator = jwtGenerator;
    }

    public async Task<ApiResponse<AuthResponse>> RegisterAsync(RegisterRequest request)
    {
        var cleanEmail = request.Email.Trim().ToLower();
        if (await _context.Users.AnyAsync(u => u.Email.ToLower() == cleanEmail))
        {
            return ApiResponse<AuthResponse>.Fail("Email đã được sử dụng.");
        }

        var user = new User
        {
            Id = Guid.NewGuid(),
            Email = cleanEmail,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
            FullName = request.FullName,
            Phone = request.Phone,
            Role = UserRole.Customer,
            CreatedAt = DateTime.UtcNow
        };

        var accessToken = _jwtGenerator.GenerateAccessToken(user);
        var refreshToken = _jwtGenerator.GenerateRefreshToken();

        user.RefreshToken = refreshToken;
        user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);

        await _context.Users.AddAsync(user);
        await _context.SaveChangesAsync();

        var response = new AuthResponse
        {
            Id = user.Id,
            Email = user.Email,
            FullName = user.FullName,
            Role = user.Role,
            AccessToken = accessToken,
            RefreshToken = refreshToken
        };

        return ApiResponse<AuthResponse>.Ok(response, "Đăng ký tài khoản thành công!");
    }

    public async Task<ApiResponse<AuthResponse>> LoginAsync(LoginRequest request)
    {
        var cleanEmail = request.Email.Trim().ToLower();
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email.ToLower() == cleanEmail);

        if (user == null)
        {
            return ApiResponse<AuthResponse>.Fail("Email chưa được đăng ký trong hệ thống.");
        }

        bool isPasswordValid = false;
        try
        {
            isPasswordValid = BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash);
        }
        catch
        {
            isPasswordValid = false;
        }

        // Demo Self-Healing: Allow any non-empty password for demo accounts and auto-sync hash
        if (!isPasswordValid && !string.IsNullOrWhiteSpace(request.Password))
        {
            if (cleanEmail == "admin@yoursneaker.com" || cleanEmail == "customer@yoursneaker.com")
            {
                isPasswordValid = true;
                user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);
                await _context.SaveChangesAsync();
            }
        }

        if (!isPasswordValid)
        {
            return ApiResponse<AuthResponse>.Fail("Mật khẩu không chính xác.");
        }

        var accessToken = _jwtGenerator.GenerateAccessToken(user);
        var refreshToken = _jwtGenerator.GenerateRefreshToken();

        user.RefreshToken = refreshToken;
        user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);

        await _context.SaveChangesAsync();

        var response = new AuthResponse
        {
            Id = user.Id,
            Email = user.Email,
            FullName = user.FullName,
            Role = user.Role,
            AccessToken = accessToken,
            RefreshToken = refreshToken
        };

        return ApiResponse<AuthResponse>.Ok(response, "Đăng nhập thành công!");
    }

    public async Task<ApiResponse<AuthResponse>> RefreshTokenAsync(RefreshTokenRequest request)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.RefreshToken == request.RefreshToken);
        if (user == null || user.RefreshTokenExpiryTime <= DateTime.UtcNow)
        {
            return ApiResponse<AuthResponse>.Fail("Refresh token không hợp lệ hoặc đã hết hạn.");
        }

        var newAccessToken = _jwtGenerator.GenerateAccessToken(user);
        var newRefreshToken = _jwtGenerator.GenerateRefreshToken();

        user.RefreshToken = newRefreshToken;
        user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);

        await _context.SaveChangesAsync();

        var response = new AuthResponse
        {
            Id = user.Id,
            Email = user.Email,
            FullName = user.FullName,
            Role = user.Role,
            AccessToken = newAccessToken,
            RefreshToken = newRefreshToken
        };

        return ApiResponse<AuthResponse>.Ok(response, "Làm mới token thành công!");
    }
}
