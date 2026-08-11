namespace YourSneaker.Domain.Entities;

public class Product
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public decimal? OriginalPrice { get; set; }
    public int Stock { get; set; }
    public string ImageUrl { get; set; } = string.Empty;
    public string Brand { get; set; } = string.Empty;
    public bool IsFeatured { get; set; } = false;
    public bool IsNewRelease { get; set; } = false;
    public double Rating { get; set; } = 5.0;
    public int ReviewCount { get; set; } = 0;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public Guid CategoryId { get; set; }
    public Category? Category { get; set; }
}
