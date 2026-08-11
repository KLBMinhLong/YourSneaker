import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Star } from 'lucide-react';
import { Product } from '../../types';
import { useCartStore } from '../../store/useCartStore';

interface ProductCardProps {
  product: Product;
}

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1000&q=80";

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addItem = useCartStore((state) => state.addItem);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  return (
    <div className="product-card">
      <div className="img-wrapper">
        <img
          src={product.imageUrl || FALLBACK_IMAGE}
          alt={product.name}
          onError={(e) => {
            (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
          }}
        />
        <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px' }}>
          {product.isFeatured && <span className="badge badge-featured">HOT</span>}
          {product.isNewRelease && <span className="badge badge-new">NEW</span>}
        </div>
      </div>

      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-secondary)', textTransform: 'uppercase' }}>
              {product.brand}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--accent-gold)' }}>
              <Star size={14} fill="var(--accent-gold)" />
              <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{product.rating}</span>
              <span style={{ color: 'var(--text-muted)' }}>({product.reviewCount})</span>
            </div>
          </div>

          <Link to={`/products/${product.slug}`} style={{ textDecoration: 'none' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '12px', color: 'var(--text-primary)', lineHeight: 1.4 }}>
              {product.name}
            </h3>
          </Link>
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '16px' }}>
            <span style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--accent-primary)' }}>
              {formatCurrency(product.price)}
            </span>
            {product.originalPrice && (
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>

          <button
            className="btn btn-primary"
            style={{ width: '100%', padding: '10px', fontSize: '0.85rem' }}
            onClick={() => addItem(product)}
          >
            <ShoppingBag size={16} /> Thêm Giỏ Hàng
          </button>
        </div>
      </div>
    </div>
  );
};
