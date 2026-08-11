using YourSneaker.Domain.Entities;
using YourSneaker.Domain.Enums;
using BCrypt.Net;

namespace YourSneaker.Infrastructure.Persistence;

public static class DbInitializer
{
    public static async Task SeedAsync(AppDbContext context)
    {
        await context.Database.EnsureCreatedAsync();

        if (!context.Users.Any())
        {
            var adminUser = new User
            {
                Id = Guid.NewGuid(),
                Email = "admin@yoursneaker.com",
                FullName = "Admin YourSneaker",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin@123456"),
                Role = UserRole.Admin,
                CreatedAt = DateTime.UtcNow
            };

            var demoCustomer = new User
            {
                Id = Guid.NewGuid(),
                Email = "customer@yoursneaker.com",
                FullName = "Khách Hàng Demo",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("Customer@123456"),
                Role = UserRole.Customer,
                CreatedAt = DateTime.UtcNow
            };

            await context.Users.AddRangeAsync(adminUser, demoCustomer);
        }

        if (!context.Categories.Any())
        {
            var jordanCategory = new Category
            {
                Id = Guid.Parse("11111111-1111-1111-1111-111111111111"),
                Name = "Air Jordan",
                Slug = "air-jordan",
                Description = "Biểu tượng bóng rổ và văn hóa streetwear toàn cầu.",
                ImageUrl = "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80"
            };

            var yeezyCategory = new Category
            {
                Id = Guid.Parse("22222222-2222-2222-2222-222222222222"),
                Name = "Yeezy",
                Slug = "yeezy",
                Description = "Thiết kế tương lai và êm ái đột phá từ Kanye West.",
                ImageUrl = "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80"
            };

            var nikeDunkCategory = new Category
            {
                Id = Guid.Parse("33333333-3333-3333-3333-333333333333"),
                Name = "Nike Dunk",
                Slug = "nike-dunk",
                Description = "Mẫu giày trượt ván & đường phố kinh điển.",
                ImageUrl = "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80"
            };

            var newBalanceCategory = new Category
            {
                Id = Guid.Parse("44444444-4444-4444-4444-444444444444"),
                Name = "New Balance",
                Slug = "new-balance",
                Description = "Phong cách Retro Runner hiện đại và thoải mái tối đa.",
                ImageUrl = "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80"
            };

            await context.Categories.AddRangeAsync(jordanCategory, yeezyCategory, nikeDunkCategory, newBalanceCategory);
            await context.SaveChangesAsync();

            if (!context.Products.Any())
            {
                var products = new List<Product>
                {
                    new Product
                    {
                        Id = Guid.NewGuid(),
                        Name = "Air Jordan 1 Retro High OG 'Chicago'",
                        Slug = "air-jordan-1-retro-high-og-chicago",
                        Brand = "Nike / Jordan",
                        Description = "Mẫu giày huyền thoại gắn liền với tên tuổi Michael Jordan năm 1985. Phối màu đỏ trắng đen biểu tượng nhất lịch sử sneaker.",
                        Price = 12500000,
                        OriginalPrice = 14500000,
                        Stock = 15,
                        CategoryId = jordanCategory.Id,
                        ImageUrl = "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1000&q=80",
                        IsFeatured = true,
                        IsNewRelease = true,
                        Rating = 4.9,
                        ReviewCount = 128
                    },
                    new Product
                    {
                        Id = Guid.NewGuid(),
                        Name = "Travis Scott x Air Jordan 1 Low 'Reverse Mocha'",
                        Slug = "travis-scott-air-jordan-1-low-reverse-mocha",
                        Brand = "Nike / Jordan",
                        Description = "Phiên bản collab đình đám với logo Swoosh ngược đặc trưng của rapper Travis Scott cùng chất liệu da lộn cao cấp.",
                        Price = 28900000,
                        OriginalPrice = 32000000,
                        Stock = 5,
                        CategoryId = jordanCategory.Id,
                        ImageUrl = "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=80",
                        IsFeatured = true,
                        IsNewRelease = true,
                        Rating = 5.0,
                        ReviewCount = 210
                    },
                    new Product
                    {
                        Id = Guid.NewGuid(),
                        Name = "Yeezy Boost 350 V2 'Zebra'",
                        Slug = "yeezy-boost-350-v2-zebra",
                        Brand = "Adidas / Yeezy",
                        Description = "Họa tiết vằn ngựa đặc trưng kết hợp dòng chữ SPLY-350 đỏ rực rỡ và đế Boost êm ái tuyệt đối.",
                        Price = 8500000,
                        OriginalPrice = 9800000,
                        Stock = 20,
                        CategoryId = yeezyCategory.Id,
                        ImageUrl = "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=1000&q=80",
                        IsFeatured = true,
                        IsNewRelease = false,
                        Rating = 4.8,
                        ReviewCount = 95
                    },
                    new Product
                    {
                        Id = Guid.NewGuid(),
                        Name = "Nike Dunk Low 'Panda' White Black",
                        Slug = "nike-dunk-low-panda-white-black",
                        Brand = "Nike",
                        Description = "Đôi sneaker 'quốc dân' dễ phối đồ nhất mọi thời đại với hai tông màu Trắng/Đen tối giản.",
                        Price = 3200000,
                        OriginalPrice = 3800000,
                        Stock = 45,
                        CategoryId = nikeDunkCategory.Id,
                        ImageUrl = "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80",
                        IsFeatured = false,
                        IsNewRelease = false,
                        Rating = 4.7,
                        ReviewCount = 340
                    },
                    new Product
                    {
                        Id = Guid.NewGuid(),
                        Name = "New Balance 2002R 'Protection Pack Rain Cloud'",
                        Slug = "new-balance-2002r-protection-pack-rain-cloud",
                        Brand = "New Balance",
                        Description = "Thiết kế cắt rách deconstructed độc đáo, kết hợp đệm ABZORB và N-ergy cho cảm giác di chuyển cực kỳ cá tính.",
                        Price = 5200000,
                        OriginalPrice = 6000000,
                        Stock = 12,
                        CategoryId = newBalanceCategory.Id,
                        ImageUrl = "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=1000&q=80",
                        IsFeatured = true,
                        IsNewRelease = true,
                        Rating = 4.9,
                        ReviewCount = 82
                    },
                    new Product
                    {
                        Id = Guid.NewGuid(),
                        Name = "Adidas Samba OG 'Cloud White'",
                        Slug = "adidas-samba-og-cloud-white",
                        Brand = "Adidas",
                        Description = "Biểu tượng phong cách Blokecore đình đám năm 2024 với chất liệu da cao cấp và mũi giày da lộn kinh điển.",
                        Price = 2900000,
                        OriginalPrice = 3400000,
                        Stock = 30,
                        CategoryId = nikeDunkCategory.Id,
                        ImageUrl = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80",
                        IsFeatured = false,
                        IsNewRelease = true,
                        Rating = 4.8,
                        ReviewCount = 115
                    }
                };

                await context.Products.AddRangeAsync(products);
            }
        }

        await context.SaveChangesAsync();
    }
}
