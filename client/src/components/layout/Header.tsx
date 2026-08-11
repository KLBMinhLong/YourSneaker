import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, User, Flame, LogOut, ShieldAlert } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';

export const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const totalItems = useCartStore((state) => state.getTotalItems());

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (token && userStr) {
      try {
        setUser(JSON.parse(userStr));
      } catch {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const isAdmin = user && (
    user.role === 'Admin' ||
    user.role === 1 ||
    user.role === '1' ||
    user.email === 'admin@yoursneaker.com'
  );

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
        <nav style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <Link to="/" style={{ fontWeight: 600, fontSize: '0.95rem', transition: 'color 0.2s' }}>TRANG CHỦ</Link>
          <Link to="/products" style={{ fontWeight: 600, fontSize: '0.95rem', transition: 'color 0.2s' }}>SẢN PHẨM</Link>
          <Link to="/products?category=air-jordan" style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-secondary)' }}>JORDAN</Link>
          <Link to="/products?category=yeezy" style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-secondary)' }}>YEEZY</Link>
          <Link to="/my-orders" style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--accent-secondary)' }}>ĐƠN HÀNG</Link>
          {isAdmin && (
            <Link to="/admin" className="btn btn-outline" style={{ padding: '6px 14px', fontSize: '0.8rem', gap: '6px', color: 'var(--accent-secondary)', borderColor: 'var(--accent-secondary)' }}>
              <ShieldAlert size={14} /> TRANG ADMIN
            </Link>
          )}
        </nav>

        {/* Search Bar */}
        <form onSubmit={handleSearch} style={{ position: 'relative', width: '220px' }}>
          <input
            type="text"
            placeholder="Tìm sneaker..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 14px 8px 36px',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-primary)',
              outline: 'none',
              fontSize: '0.85rem'
            }}
          />
          <Search size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
        </form>

        {/* User & Cart Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Chào, <span style={{ color: 'var(--accent-secondary)' }}>{user.fullName || user.email?.split('@')[0]}</span>
              </div>
              <button
                onClick={handleLogout}
                title="Đăng xuất"
                style={{
                  background: 'rgba(255,46,99,0.15)',
                  border: '1px solid rgba(255,46,99,0.3)',
                  color: 'var(--accent-primary)',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
              <User size={16} /> ĐĂNG NHẬP
            </Link>
          )}

          <Link to="/cart" style={{ position: 'relative', width: '38px', height: '38px', borderRadius: '50%', background: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-glow)' }}>
            <ShoppingBag size={18} color="#FFF" />
            {totalItems > 0 && (
              <span style={{ position: 'absolute', top: '-4px', right: '-4px', background: 'var(--accent-secondary)', color: '#000', fontSize: '0.7rem', fontWeight: 800, width: '18px', height: '18px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};
