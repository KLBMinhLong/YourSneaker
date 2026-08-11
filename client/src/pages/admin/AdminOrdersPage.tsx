import React, { useEffect, useState } from 'react';
import { ShoppingCart, Search, RefreshCw } from 'lucide-react';
import { adminApi } from '../../api/adminApi';
import { OrderResponse } from '../../api/ordersApi';

export const AdminOrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const loadOrders = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getAllOrders();
      if (res.success && res.data) setOrders(res.data);
    } catch (err) {
      console.error('Failed to load admin orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: number) => {
    try {
      const res = await adminApi.updateOrderStatus(orderId, newStatus);
      if (res.success) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
        );
      }
    } catch (err) {
      alert('Không thể cập nhật trạng thái đơn hàng.');
    }
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  const filteredOrders = orders.filter(
    (o) =>
      o.orderCode.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.customerPhone.includes(search)
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 900 }}>QUẢN LÝ ĐƠN HÀNG ({filteredOrders.length})</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Theo dõi & Cập nhật trạng thái xử lý/vận chuyển đơn hàng</p>
        </div>
        <button onClick={loadOrders} className="btn btn-outline" style={{ padding: '10px 18px', gap: '8px' }}>
          <RefreshCw size={16} /> Làm Mới
        </button>
      </div>

      {/* Search Bar */}
      <div className="glass-panel" style={{ padding: '16px 20px', display: 'flex', gap: '16px', alignItems: 'center' }}>
        <div style={{ position: 'relative', width: '360px' }}>
          <input
            type="text"
            placeholder="Tìm theo mã đơn, khách hàng hoặc SĐT..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', padding: '10px 16px 10px 38px', borderRadius: 'var(--radius-full)', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', outline: 'none', fontSize: '0.85rem' }}
          />
          <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
        </div>
      </div>

      {/* Orders Table */}
      <div className="glass-panel" style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>
              <th style={{ padding: '16px 20px' }}>Mã đơn</th>
              <th style={{ padding: '16px 20px' }}>Khách hàng</th>
              <th style={{ padding: '16px 20px' }}>Địa chỉ giao hàng</th>
              <th style={{ padding: '16px 20px' }}>Thanh toán</th>
              <th style={{ padding: '16px 20px' }}>Tổng tiền</th>
              <th style={{ padding: '16px 20px' }}>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>Đang tải danh sách...</td></tr>
            ) : filteredOrders.length === 0 ? (
              <tr><td colSpan={6} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>Chưa phát sinh đơn hàng nào.</td></tr>
            ) : (
              filteredOrders.map((order) => (
                <tr key={order.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '14px 20px', fontWeight: 800, color: 'var(--accent-primary)' }}>
                    {order.orderCode}
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 400 }}>
                      {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                    </div>
                  </td>

                  <td style={{ padding: '14px 20px' }}>
                    <div style={{ fontWeight: 700 }}>{order.customerName}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{order.customerPhone}</div>
                  </td>

                  <td style={{ padding: '14px 20px', maxWidth: '240px', color: 'var(--text-secondary)' }}>
                    {order.shippingAddress}
                  </td>

                  <td style={{ padding: '14px 20px' }}>
                    <span style={{ fontWeight: 700, color: order.paymentMethod === 1 ? 'var(--accent-secondary)' : 'var(--text-primary)' }}>
                      {order.paymentMethod === 0 ? 'COD (Tiền mặt)' : 'VNPay Online'}
                    </span>
                  </td>

                  <td style={{ padding: '14px 20px', fontWeight: 900, color: 'var(--accent-primary)' }}>
                    {formatCurrency(order.totalAmount)}
                  </td>

                  <td style={{ padding: '14px 20px' }}>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, Number(e.target.value))}
                      style={{
                        padding: '8px 12px',
                        borderRadius: 'var(--radius-sm)',
                        background: 'rgba(30,30,40,0.95)',
                        border: '1px solid var(--border-subtle)',
                        color: order.status === 3 ? 'var(--accent-secondary)' : order.status === 4 ? 'var(--accent-primary)' : 'var(--accent-gold)',
                        fontWeight: 700,
                        fontSize: '0.8rem',
                        cursor: 'pointer'
                      }}
                    >
                      <option value={0}>⏳ Chờ xử lý (Pending)</option>
                      <option value={1}>📦 Đang đóng gói (Processing)</option>
                      <option value={2}>🚚 Đang giao hàng (Shipped)</option>
                      <option value={3}>✅ Đã giao hàng (Delivered)</option>
                      <option value={4}>❌ Đã hủy (Cancelled)</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
