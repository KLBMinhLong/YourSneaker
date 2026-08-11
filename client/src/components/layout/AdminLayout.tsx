import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, ArrowLeft, Flame } from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/admin', label: 'THỐNG KÊ DASHBOARD', icon: LayoutDashboard },
    { path: '/admin/products', label: 'QUẢN LÝ SẢN PHẨM', icon: Package },
    { path: '/admin/orders', label: 'QUẢN LÝ ĐƠN HÀNG', icon: ShoppingCart },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', minHeight: '100vh', background: 'var(--bg-dark)' }}>
      {/* Sidebar */}
      <aside className="glass-panel" style={{ borderRadius: 0, borderTop: 'none', borderLeft: 'none', borderBottom: 'none', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          {/* Admin Brand */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', marginBottom: '36px' }}>
            <div style={{ background: 'var(--accent-primary)', width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Flame color="#FFF" size={22} />
            </div>
            <div>
              <div style={{ fontSize: '1.2rem', fontWeight: 900, fontFamily: 'var(--font-heading)' }}>
                YOUR<span style={{ color: 'var(--accent-primary)' }}>SNEAKER</span>
              </div>
              <div style={{ fontSize: '0.65rem', color: 'var(--accent-secondary)', fontWeight: 800, letterSpacing: '0.1em' }}>ADMIN PORTAL</div>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-sm)',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    textDecoration: 'none',
                    color: isActive ? '#FFF' : 'var(--text-secondary)',
                    background: isActive ? 'var(--accent-primary)' : 'transparent',
                    boxShadow: isActive ? 'var(--shadow-glow)' : 'none',
                    transition: 'all 0.2s'
                  }}
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Back to store link */}
        <Link
          to="/"
          className="btn btn-outline"
          style={{ width: '100%', padding: '12px', fontSize: '0.85rem', justifyContent: 'center' }}
        >
          <ArrowLeft size={16} /> Quay Lại Store
        </Link>
      </aside>

      {/* Main Content Area */}
      <main style={{ padding: '36px 40px', overflowY: 'auto' }}>
        <Outlet />
      </main>
    </div>
  );
};
