import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, Star, ArrowLeft } from 'lucide-react';
import { productsApi } from '../api/productsApi';
import { Product } from '../types';
import { useCartStore } from '../store/useCartStore';

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1000&q=80";

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState('42');
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((state) => state.addItem);

  const availableSizes = ['39', '40', '41', '42', '43', '44'];

  useEffect(() => {
    const fetchProduct = async () => {
      if (!slug) return;
      try {
        const res = await productsApi.getProductBySlug(slug);
        if (res.success && res.data) setProduct(res.data);
      } catch (err) {
        console.error('Error loading product:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  if (loading) return <div style={{ textAlign: 'center', padding: '80px', color: 'var(--text-muted)' }}>Đang tải chi tiết sản phẩm...</div>;
  if (!product) return <div style={{ textAlign: 'center', padding: '80px', color: 'var(--text-muted)' }}>Không tìm thấy sản phẩm.</div>;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      <Link to="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 600 }}>
        <ArrowLeft size={16} /> Quay lại danh sách sản phẩm
      </Link>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start' }}>
        
        {/* Product Image */}
        <div className="glass-panel" style={{ padding: '24px', overflow: 'hidden' }}>
          <img
            src={product.imageUrl || FALLBACK_IMAGE}
            alt={product.name}
            onError={(e) => {
              (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
            }}
            style={{ width: '100%', height: '480px', objectFit: 'cover', borderRadius: 'var(--radius-md)' }}
          />
        </div>

        {/* Product Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {product.brand}
            </span>
            <h1 style={{ fontSize: '2.4rem', fontWeight: 900, margin: '8px 0 16px', lineHeight: 1.2 }}>
              {product.name}
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent-gold)' }}>
                <Star size={18} fill="var(--accent-gold)" />
                <span style={{ fontWeight: 800, color: 'var(--text-primary)' }}>{product.rating}</span>
              </div>
              <span style={{ color: 'var(--text-muted)' }}>|</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{product.reviewCount} đánh giá từ khách hàng</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px' }}>
            <span style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--accent-primary)' }}>
              {formatCurrency(product.price)}
            </span>
            {product.originalPrice && (
              <span style={{ fontSize: '1.2rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>

          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.95rem' }}>
            {product.description}
          </p>

          {/* Size Picker */}
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 800, marginBottom: '12px', textTransform: 'uppercase' }}>
              CHỌN SIZE (EU)
            </h4>
            <div style={{ display: 'flex', gap: '12px' }}>
              {availableSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: 'var(--radius-sm)',
                    border: selectedSize === size ? '2px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                    background: selectedSize === size ? 'rgba(255,46,99,0.15)' : 'rgba(255,255,255,0.04)',
                    color: selectedSize === size ? 'var(--accent-primary)' : 'var(--text-primary)',
                    fontWeight: 800,
                    fontSize: '1rem',
                    cursor: 'pointer'
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart button */}
          <button
            className="btn btn-primary"
            style={{ padding: '16px', fontSize: '1rem', width: '100%', marginTop: '12px' }}
            onClick={() => addItem(product, selectedSize)}
          >
            <ShoppingBag size={20} /> THÊM VÀO GIỎ HÀNG (SIZE {selectedSize})
          </button>

        </div>

      </div>
    </div>
  );
};
