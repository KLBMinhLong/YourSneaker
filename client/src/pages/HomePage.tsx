import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Flame, Sparkles } from 'lucide-react';
import { productsApi } from '../api/productsApi';
import { Product, Category } from '../types';
import { ProductCard } from '../components/ui/ProductCard';

export const HomePage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          productsApi.getFeaturedProducts(),
          productsApi.getCategories(),
        ]);
        if (prodRes.success && prodRes.data) setFeaturedProducts(prodRes.data);
        if (catRes.success && catRes.data) setCategories(catRes.data);
      } catch (err) {
        console.error('Failed to fetch homepage data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
      
      {/* Hero Section */}
      <section
        className="glass-panel"
        style={{
          position: 'relative',
          overflow: 'hidden',
          padding: '60px 48px',
          background: 'linear-gradient(135deg, rgba(255,46,99,0.15) 0%, rgba(0,242,254,0.06) 100%)',
          borderRadius: 'var(--radius-lg)'
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', alignItems: 'center', gap: '48px', position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '600px' }}>
            <div className="badge badge-featured" style={{ marginBottom: '20px' }}>
              <Sparkles size={14} /> BST STREETWEAR HIGHLIGHT 2026
            </div>
            
            <h1 style={{ fontSize: '3.4rem', fontWeight: 900, lineHeight: 1.1, marginBottom: '24px' }}>
              ĐỊNH HÌNH <br />
              <span className="text-gradient-accent">PHONG CÁCH RIÊNG</span>
            </h1>

            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '36px', lineHeight: 1.6 }}>
              Khám phá bộ sưu tập Sneaker độc bản, chính hãng 100%. Từ Air Jordan huyền thoại đến Yeezy mang hơi thở tương lai.
            </p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <Link to="/products" className="btn btn-primary" style={{ padding: '14px 32px' }}>
                KHÁM PHÁ NGAY <ArrowRight size={18} />
              </Link>
              <Link to="/products?category=air-jordan" className="btn btn-outline" style={{ padding: '14px 32px' }}>
                JORDAN BST
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Sneaker Showcase */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', minHeight: '340px' }}>
            {/* Ambient Radial Glow Effect */}
            <div style={{
              position: 'absolute',
              width: '360px',
              height: '360px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,46,99,0.35) 0%, rgba(0,242,254,0.18) 55%, transparent 75%)',
              filter: 'blur(40px)',
              pointerEvents: 'none'
            }} />
            
            <img
              src="/hero-sneaker.png"
              alt="Air Jordan 1 High Retro Chicago Iconic Sneaker"
              style={{
                maxWidth: '100%',
                maxHeight: '400px',
                objectFit: 'contain',
                filter: 'drop-shadow(0 25px 35px rgba(0, 0, 0, 0.8)) drop-shadow(0 0 45px rgba(255, 46, 99, 0.45))',
                transform: 'rotate(-12deg) scale(1.05)',
                transition: 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'rotate(-4deg) scale(1.15)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'rotate(-12deg) scale(1.05)')}
            />
          </div>
        </div>

        {/* Floating background elements */}
        <div style={{ position: 'absolute', right: '-50px', top: '-20px', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,46,99,0.2) 0%, rgba(0,0,0,0) 70%)', pointerEvents: 'none' }} />
      </section>

      {/* Featured Categories */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>DANH MỤC NỔI BẬT</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Lựa chọn thương hiệu khẳng định cá tính</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/products?category=${cat.slug}`}
              className="glass-panel"
              style={{
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '180px',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px' }}>
                  {cat.name}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  {cat.productCount} sản phẩm sẵn có
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-secondary)' }}>
                XEM BỘ SƯU TẬP <ArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Grid */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-primary)', fontWeight: 700, fontSize: '0.9rem', marginBottom: '4px' }}>
              <Flame size={18} /> HOT TRENDING
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>SẢN PHẨM BÁN CHẠY</h2>
          </div>
          <Link to="/products" style={{ color: 'var(--accent-secondary)', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
            Xem Tất Cả ({featuredProducts.length}) <ArrowRight size={16} />
          </Link>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>Đang tải danh sách sneaker...</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px' }}>
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

    </div>
  );
};
