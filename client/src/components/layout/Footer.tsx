import React from 'react';
import { Flame, ShieldCheck, Truck, RefreshCw, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer style={{ background: '#050608', borderTop: '1px solid var(--border-subtle)', marginTop: '80px', paddingTop: '60px', paddingBottom: '40px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Features banner */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', paddingBottom: '40px', marginBottom: '40px', borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255,46,99,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck color="var(--accent-primary)" size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>100% CHÍNH HÃNG</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Bao kiểm tra authentic trọn đời</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(0,242,254,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Truck color="var(--accent-secondary)" size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>GIAO HÀNG HỎA TỐC</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Nội thành nhận ngay trong 2h</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255,199,44,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <RefreshCw color="var(--accent-gold)" size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>ĐỔI TRẢ 7 NGÀY</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Miễn phí đổi size nếu không vừa</p>
            </div>
          </div>
        </div>

        {/* Links section */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '40px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Flame color="var(--accent-primary)" size={24} />
              <span style={{ fontSize: '1.25rem', fontWeight: 900 }}>YOURSNEAKER</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Nền tảng mua sắm Sneaker & Streetwear hàng đầu. Mang lại trải nghiệm độc bản, đậm chất riêng.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '16px', color: 'var(--text-primary)', textTransform: 'uppercase' }}>DANH MỤC</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <li>Air Jordan</li>
              <li>Yeezy Boost</li>
              <li>Nike Dunk</li>
              <li>New Balance</li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '16px', color: 'var(--text-primary)', textTransform: 'uppercase' }}>HỖ TRỢ KHÁCH HÀNG</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <li>Hướng dẫn chọn size</li>
              <li>Chính sách bảo hành</li>
              <li>Chính sách vận chuyển</li>
              <li>Liên hệ hợp tác</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <p>© 2026 YOURSNEAKER. Demo Portfolio Project built with ASP.NET Core & React.</p>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <a href="/admin" style={{ color: 'var(--accent-secondary)', fontWeight: 700 }}>Quản Trị Admin Portal</a>
            <a href="https://github.com" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
              <Globe size={16} /> GitHub Repo
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
