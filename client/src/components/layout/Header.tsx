import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, User, Menu, X, Flame } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const totalItems = useCartStore((state) => state.getTotalItems());

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="glass-panel" style={{ position: 'sticky', top: 0, zIndex: 100, borderRadius: 0, borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
        
        {/* Brand Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <div style={{ background: 'var(--accent-primary)', width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-glow)' }}>
            <Flame color="#FFF" size={22} />
          </div>
          <span style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-0.03em', fontFamily: 'var(--font-heading)' }}>
            YOUR<span style={{ color: 'var(--accent-primary)' }}>SNEAKER</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <nav style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          <Link to="/" style={{ fontWeight: 600, fontSize: '0.95rem', transition: 'color 0.2s' }}>TRANG CHỦ</Link>
          <Link to="/products" style={{ fontWeight: 600, fontSize: '0.95rem', transition: 'color 0.2s' }}>SẢN PHẨM</Link>
          <Link to="/products?category=air-jordan" style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-secondary)' }}>JORDAN</Link>
          <Link to="/products?category=yeezy" style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-secondary)' }}>YEEZY</Link>
        </nav>

        {/* Search Bar */}
        <form onSubmit={handleSearch} style={{ position: 'relative', width: '280px' }}>
          <input
            type="text"
            placeholder="Tìm sneaker, thương hiệu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 16px 10px 40px',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-primary)',
              outline: 'none',
              fontSize: '0.85rem'
            }}
          />
          <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
        </form>

        {/* User & Cart Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link to="/login" style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-subtle)' }}>
            <User size={20} color="var(--text-primary)" />
          </Link>

          <Link to="/cart" style={{ position: 'relative', width: '40px', height: '40px', borderRadius: '50%', background: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-glow)' }}>
            <ShoppingBag size={20} color="#FFF" />
            {totalItems > 0 && (
              <span style={{ position: 'absolute', top: '-4px', right: '-4px', background: 'var(--accent-secondary)', color: '#000', fontSize: '0.75rem', fontWeight: 800, width: '20px', height: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};
