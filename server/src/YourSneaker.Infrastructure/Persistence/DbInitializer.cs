using YourSneaker.Domain.Entities;
using YourSneaker.Domain.Enums;
using BCrypt.Net;

namespace YourSneaker.Infrastructure.Persistence;

public static class DbInitializer
{
    public static async Task SeedAsync(AppDbContext context)
    {
        try
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
                await context.SaveChangesAsync();
            }

            if (!context.Categories.Any())
            {
                var categories = new List<Category>
                {
                    new Category
                    {
                        Id = Guid.Parse("11111111-1111-1111-1111-111111111111"),
                        Name = "Air Jordan",
                        Slug = "air-jordan",
                        Description = "Biểu tượng bóng rổ và văn hóa streetwear toàn cầu.",
                        ImageUrl = "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80"
                    },
                    new Category
                    {
                        Id = Guid.Parse("22222222-2222-2222-2222-222222222222"),
                        Name = "Yeezy",
                        Slug = "yeezy",
                        Description = "Thiết kế tương lai và êm ái đột phá từ Kanye West.",
                        ImageUrl = "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80"
                    },
                    new Category
                    {
                        Id = Guid.Parse("33333333-3333-3333-3333-333333333333"),
                        Name = "Nike Dunk",
                        Slug = "nike-dunk",
                        Description = "Mẫu giày trượt ván & đường phố kinh điển.",
                        ImageUrl = "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80"
                    },
                    new Category
                    {
                        Id = Guid.Parse("44444444-4444-4444-4444-444444444444"),
                        Name = "New Balance",
                        Slug = "new-balance",
                        Description = "Phong cách Retro Runner hiện đại và thoải mái tối đa.",
                        ImageUrl = "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80"
                    }
                };

                await context.Categories.AddRangeAsync(categories);
                await context.SaveChangesAsync();
            }

            var allCategories = context.Categories.ToList();
            if (allCategories.Count == 0) return;

            var defaultCatId = allCategories[0].Id;
            var jordanId = allCategories.FirstOrDefault(c => c.Slug == "air-jordan")?.Id ?? defaultCatId;
            var yeezyId = allCategories.FirstOrDefault(c => c.Slug == "yeezy")?.Id ?? defaultCatId;
            var nikeDunkId = allCategories.FirstOrDefault(c => c.Slug == "nike-dunk")?.Id ?? defaultCatId;
            var newBalanceId = allCategories.FirstOrDefault(c => c.Slug == "new-balance")?.Id ?? defaultCatId;

            // Seed products if not seeded or low count
            if (context.Products.Count() < 10)
            {
                if (context.Products.Any())
                {
                    context.Products.RemoveRange(context.Products);
                    await context.SaveChangesAsync();
                }

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
                        CategoryId = jordanId,
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
                        CategoryId = jordanId,
                        ImageUrl = "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=80",
                        IsFeatured = true,
                        IsNewRelease = true,
                        Rating = 5.0,
                        ReviewCount = 210
                    },
                    new Product
                    {
                        Id = Guid.NewGuid(),
                        Name = "Air Jordan 4 Retro 'Black Cat'",
                        Slug = "air-jordan-4-retro-black-cat",
                        Brand = "Nike / Jordan",
                        Description = "Toàn bộ tông đen huyền bí với chất liệu da lộn nubuck mịn màng, thiết kế cổ điển được giới trẻ săn lùng nhiều nhất.",
                        Price = 18500000,
                        OriginalPrice = 21000000,
                        Stock = 8,
                        CategoryId = jordanId,
                        ImageUrl = "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?auto=format&fit=crop&w=1000&q=80",
                        IsFeatured = true,
                        IsNewRelease = false,
                        Rating = 4.9,
                        ReviewCount = 175
                    },
                    new Product
                    {
                        Id = Guid.NewGuid(),
                        Name = "Air Jordan 1 Low 'SE Craft Inside Out'",
                        Slug = "air-jordan-1-low-se-craft-inside-out",
                        Brand = "Nike / Jordan",
                        Description = "Phong cách deconstructed lộ đường chỉ khâu cá tính, tone màu xám trung tính dễ dàng phối mọi trang phục Streetwear.",
                        Price = 4200000,
                        OriginalPrice = 4800000,
                        Stock = 22,
                        CategoryId = jordanId,
                        ImageUrl = "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1000&q=80",
                        IsFeatured = false,
                        IsNewRelease = true,
                        Rating = 4.7,
                        ReviewCount = 64
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
                        CategoryId = yeezyId,
                        ImageUrl = "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=1000&q=80",
                        IsFeatured = true,
                        IsNewRelease = false,
                        Rating = 4.8,
                        ReviewCount = 95
                    },
                    new Product
                    {
                        Id = Guid.NewGuid(),
                        Name = "Yeezy Foam Runner 'Onyx'",
                        Slug = "yeezy-foam-runner-onyx",
                        Brand = "Adidas / Yeezy",
                        Description = "Mẫu dép đúc futuristic từ chất liệu bọt biển EVA siêu nhẹ, khả năng thoáng khí và phong cách thời trang avant-garde.",
                        Price = 4800000,
                        OriginalPrice = 5500000,
                        Stock = 18,
                        CategoryId = yeezyId,
                        ImageUrl = "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=1000&q=80",
                        IsFeatured = false,
                        IsNewRelease = true,
                        Rating = 4.6,
                        ReviewCount = 52
                    },
                    new Product
                    {
                        Id = Guid.NewGuid(),
                        Name = "Yeezy Slide 'Pure'",
                        Slug = "yeezy-slide-pure",
                        Brand = "Adidas / Yeezy",
                        Description = "Dép slide nguyên khối êm ái bậc nhất, gam màu be kem tối giản nâng tầm outfit hàng ngày.",
                        Price = 3500000,
                        OriginalPrice = 4200000,
                        Stock = 35,
                        CategoryId = yeezyId,
                        ImageUrl = "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1000&q=80",
                        IsFeatured = false,
                        IsNewRelease = false,
                        Rating = 4.8,
                        ReviewCount = 140
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
                        CategoryId = nikeDunkId,
                        ImageUrl = "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80",
                        IsFeatured = false,
                        IsNewRelease = false,
                        Rating = 4.7,
                        ReviewCount = 340
                    },
                    new Product
                    {
                        Id = Guid.NewGuid(),
                        Name = "Nike SB Dunk Low x Jarritos",
                        Slug = "nike-sb-dunk-low-jarritos",
                        Brand = "Nike",
                        Description = "Bản hợp tác với hãng nước ngọt Jarritos Mexico, vải bao tải đay có thể xé màng da bên trong cực kỳ sáng tạo.",
                        Price = 14800000,
                        OriginalPrice = 16500000,
                        Stock = 6,
                        CategoryId = nikeDunkId,
                        ImageUrl = "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&w=1000&q=80",
                        IsFeatured = true,
                        IsNewRelease = true,
                        Rating = 4.9,
                        ReviewCount = 88
                    },
                    new Product
                    {
                        Id = Guid.NewGuid(),
                        Name = "Nike Air Force 1 '07 Low White",
                        Slug = "nike-air-force-1-07-low-white",
                        Brand = "Nike",
                        Description = "Biểu tượng hiphop bất tử từ năm 1982. Toàn bộ da màu trắng tinh khôi kết hợp thẻ dây Dubrae kim loại cao cấp.",
                        Price = 2650000,
                        OriginalPrice = 3100000,
                        Stock = 50,
                        CategoryId = nikeDunkId,
                        ImageUrl = "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&w=1000&q=80",
                        IsFeatured = false,
                        IsNewRelease = false,
                        Rating = 4.8,
                        ReviewCount = 420
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
                        CategoryId = newBalanceId,
                        ImageUrl = "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=1000&q=80",
                        IsFeatured = true,
                        IsNewRelease = true,
                        Rating = 4.9,
                        ReviewCount = 82
                    },
                    new Product
                    {
                        Id = Guid.NewGuid(),
                        Name = "New Balance 550 'White Green'",
                        Slug = "new-balance-550-white-green",
                        Brand = "New Balance",
                        Description = "Mẫu giày bóng rổ cổ điển năm 1989 được hồi sinh bởi Aimé Leon Dore, mang đậm cảm hứng Retro Vintage.",
                        Price = 3800000,
                        OriginalPrice = 4500000,
                        Stock = 28,
                        CategoryId = newBalanceId,
                        ImageUrl = "https://images.unsplash.com/photo-1617689564172-01196d1c0297?auto=format&fit=crop&w=1000&q=80",
                        IsFeatured = false,
                        IsNewRelease = false,
                        Rating = 4.7,
                        ReviewCount = 110
                    },
                    new Product
                    {
                        Id = Guid.NewGuid(),
                        Name = "New Balance 990v6 'Grey' Made in USA",
                        Slug = "new-balance-990v6-grey-made-in-usa",
                        Brand = "New Balance",
                        Description = "Sản xuất thủ công tại Mỹ với đệm FuelCell hoàn toàn mới, phối màu xám Signature đẳng cấp nhất gia tộc 99x.",
                        Price = 6900000,
                        OriginalPrice = 7800000,
                        Stock = 14,
                        CategoryId = newBalanceId,
                        ImageUrl = "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=1000&q=80",
                        IsFeatured = true,
                        IsNewRelease = true,
                        Rating = 5.0,
                        ReviewCount = 76
                    },
                    new Product
                    {
                        Id = Guid.NewGuid(),
                        Name = "Adidas Samba OG 'Cloud White'",
                        Slug = "adidas-samba-og-cloud-white",
                        Brand = "Adidas",
                        Description = "Biểu tượng phong cách Blokecore đình đám với chất liệu da cao cấp và mũi giày da lộn kinh điển.",
                        Price = 2900000,
                        OriginalPrice = 3400000,
                        Stock = 30,
                        CategoryId = nikeDunkId,
                        ImageUrl = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80",
                        IsFeatured = false,
                        IsNewRelease = true,
                        Rating = 4.8,
                        ReviewCount = 115
                    },
                    new Product
                    {
                        Id = Guid.NewGuid(),
                        Name = "Adidas Gazelle Indoor 'Bliss Pink'",
                        Slug = "adidas-gazelle-indoor-bliss-pink",
                        Brand = "Adidas",
                        Description = "Phối màu hồng pastel dịu ngọt kết hợp 3 sọc đen tương phản và đế cao su gum mờ trong suốt đầy mê hoặc.",
                        Price = 3600000,
                        OriginalPrice = 4200000,
                        Stock = 16,
                        CategoryId = nikeDunkId,
                        ImageUrl = "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?auto=format&fit=crop&w=1000&q=80",
                        IsFeatured = false,
                        IsNewRelease = true,
                        Rating = 4.7,
                        ReviewCount = 92
                    },
                    new Product
                    {
                        Id = Guid.NewGuid(),
                        Name = "Bape Sta Low 'White Black ABC Camo'",
                        Slug = "bape-sta-low-white-black-abc-camo",
                        Brand = "Bape",
                        Description = "Biểu tượng streetwear Nhật Bản với logo ngôi sao STA bóng bẩy và họa tiết rằn ri ABC Camo huyền thoại.",
                        Price = 7500000,
                        OriginalPrice = 8800000,
                        Stock = 10,
                        CategoryId = jordanId,
                        ImageUrl = "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=1000&q=80",
                        IsFeatured = true,
                        IsNewRelease = true,
                        Rating = 4.9,
                        ReviewCount = 68
                    }
                };

                await context.Products.AddRangeAsync(products);
                await context.SaveChangesAsync();
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"[DbInitializer Error]: {ex.Message}");
        }
    }
}
