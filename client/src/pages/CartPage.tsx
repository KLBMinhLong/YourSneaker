import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

export const CartPage: React.FC = () => {
  const { items, updateQuantity, removeItem, clearCart, getTotalPrice } = useCartStore();

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  if (items.length === 0) {
    return (
      <div className="glass-panel" style={{ textAlign: 'center', padding: '80px 20px', maxWidth: '600px', margin: '40px auto' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(255,46,99,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
          <ShoppingBag size={32} color="var(--accent-primary)" />
        </div>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '12px' }}>GIỎ HÀNG CỦA BẠN ĐANG TRỐNG</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '28px' }}>Hãy chọn cho mình đôi sneaker ưng ý nhất để bắt đầu mua sắm.</p>
        <Link to="/products" className="btn btn-primary">
          KHÁM PHÁ SẢN PHẨM <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <h1 style={{ fontSize: '2.2rem', fontWeight: 900 }}>GIỎ HÀNG SNEAKER ({items.length})</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '32px' }}>
        
        {/* Items List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {items.map(({ product, quantity, selectedSize }) => (
            <div key={`${product.id}-${selectedSize}`} className="glass-panel" style={{ padding: '20px', display: 'flex', gap: '20px', alignItems: 'center' }}>
              <img src={product.imageUrl} alt={product.name} style={{ width: '100px', height: '80px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} />

              <div style={{ flexGrow: 1 }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-secondary)' }}>{product.brand}</span>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: '2px 0 6px' }}>{product.name}</h3>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Size EU: <strong style={{ color: 'var(--text-primary)' }}>{selectedSize}</strong></div>
              </div>

              {/* Quantity controls */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.06)', padding: '6px 12px', borderRadius: 'var(--radius-full)' }}>
                <button onClick={() => updateQuantity(product.id, selectedSize, quantity - 1)} style={{ background: 'none', color: 'var(--text-primary)' }}>
                  <Minus size={14} />
                </button>
                <span style={{ fontWeight: 800, minWidth: '20px', textAlign: 'center' }}>{quantity}</span>
                <button onClick={() => updateQuantity(product.id, selectedSize, quantity + 1)} style={{ background: 'none', color: 'var(--text-primary)' }}>
                  <Plus size={14} />
                </button>
              </div>

              {/* Price & Delete */}
              <div style={{ textAlign: 'right', minWidth: '120px' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-primary)' }}>
                  {formatCurrency(product.price * quantity)}
                </div>
                <button onClick={() => removeItem(product.id, selectedSize)} style={{ background: 'none', color: 'var(--text-muted)', marginTop: '6px', fontSize: '0.8rem', cursor: 'pointer' }}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Sidebar */}
        <div className="glass-panel" style={{ padding: '28px', height: 'fit-content', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, borderBottom: '1px solid var(--border-subtle)', paddingBottom: '16px' }}>TỔNG ĐƠN HÀNG</h3>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            <span>Tạm tính:</span>
            <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{formatCurrency(getTotalPrice())}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            <span>Vận chuyển:</span>
            <span style={{ color: 'var(--accent-secondary)', fontWeight: 700 }}>MIỄN PHÍ</span>
          </div>

          <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 900 }}>
            <span>Tổng cộng:</span>
            <span style={{ color: 'var(--accent-primary)' }}>{formatCurrency(getTotalPrice())}</span>
          </div>

          <Link to="/checkout" className="btn btn-primary" style={{ width: '100%', padding: '14px', marginTop: '10px' }}>
            TIẾN HÀNH THANH TOÁN <ArrowRight size={18} />
          </Link>
        </div>

      </div>
    </div>
  );
};
