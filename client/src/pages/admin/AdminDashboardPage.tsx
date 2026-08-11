import React, { useEffect, useState } from 'react';
import { DollarSign, ShoppingBag, Package, Users, TrendingUp, Clock } from 'lucide-react';
import { adminApi, DashboardStats } from '../../api/adminApi';

export const AdminDashboardPage: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await adminApi.getStats();
        if (res.success && res.data) setStats(res.data);
      } catch (err) {
        console.error('Failed to load dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>Đang tải dữ liệu báo cáo...</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 900 }}>BÁO CÁO & THỐNG KÊ DOANH THU</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Tổng quan chỉ số kinh doanh ứng dụng YourSneaker Store</p>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
        
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255,46,99,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)' }}>
            <DollarSign size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700 }}>TỔNG DOANH THU</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--accent-primary)' }}>
              {formatCurrency(stats?.totalRevenue || 0)}
            </div>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(0,242,254,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-secondary)' }}>
            <ShoppingBag size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700 }}>TỔNG ĐƠN HÀNG</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 900 }}>{stats?.totalOrders || 0}</div>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255,199,44,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-gold)' }}>
            <Package size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700 }}>SẢN PHẨM HOẠT ĐỘNG</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 900 }}>{stats?.totalProducts || 0}</div>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(0,173,181,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-cyan)' }}>
            <Users size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700 }}>KHÁCH HÀNG DÙNG WEB</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 900 }}>{stats?.totalCustomers || 0}</div>
          </div>
        </div>

      </div>

      {/* Grid: Top Selling Products & Recent Orders */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px' }}>
        
        {/* Top Selling Products */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <TrendingUp size={20} color="var(--accent-primary)" /> TOP SẢN PHẨM BÁN CHẠY
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {stats?.topSellingProducts.length === 0 ? (
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Chưa có dữ liệu bán hàng.</div>
            ) : (
              stats?.topSellingProducts.map((prod) => (
                <div key={prod.productId} style={{ display: 'flex', alignItems: 'center', gap: '14px', background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: 'var(--radius-sm)' }}>
                  <img src={prod.productImageUrl} alt={prod.productName} style={{ width: '48px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                  <div style={{ flexGrow: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{prod.productName}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Đã bán: <strong style={{ color: 'var(--accent-secondary)' }}>{prod.totalQuantitySold} đôi</strong></div>
                  </div>
                  <div style={{ fontWeight: 800, color: 'var(--accent-primary)', fontSize: '0.9rem' }}>
                    {formatCurrency(prod.totalRevenue)}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Clock size={20} color="var(--accent-secondary)" /> ĐƠN HÀNG MỚI NHẤT
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {stats?.recentOrders.length === 0 ? (
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Chưa có đơn hàng nào phát sinh.</div>
            ) : (
              stats?.recentOrders.map((order) => (
                <div key={order.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.03)', padding: '12px 16px', borderRadius: 'var(--radius-sm)' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--accent-primary)' }}>{order.orderCode}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{order.customerName} - {new Date(order.createdAt).toLocaleDateString('vi-VN')}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>{formatCurrency(order.totalAmount)}</div>
                    <span className="badge badge-new" style={{ fontSize: '0.65rem' }}>Đã ghi nhận</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
