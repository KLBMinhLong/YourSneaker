import React, { useEffect, useState } from 'react';
import { Package, Clock, CheckCircle, Truck, XCircle } from 'lucide-react';
import { ordersApi, OrderResponse } from '../api/ordersApi';

export const OrderHistoryPage: React.FC = () => {
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await ordersApi.getMyOrders();
        if (res.success && res.data) setOrders(res.data);
      } catch (err) {
        console.error('Error loading order history:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  const getStatusBadge = (status: number) => {
    switch (status) {
      case 0:
        return <span className="badge" style={{ background: 'rgba(255,199,44,0.15)', color: 'var(--accent-gold)', border: '1px solid var(--accent-gold)' }}><Clock size={12} /> Đang chờ xử lý</span>;
      case 1:
        return <span className="badge badge-new"><Package size={12} /> Đang chuẩn bị hàng</span>;
      case 2:
        return <span className="badge" style={{ background: 'rgba(0,173,181,0.15)', color: 'var(--accent-cyan)', border: '1px solid var(--accent-cyan)' }}><Truck size={12} /> Đang giao hàng</span>;
      case 3:
        return <span className="badge" style={{ background: 'rgba(0,242,254,0.15)', color: 'var(--accent-secondary)', border: '1px solid var(--accent-secondary)' }}><CheckCircle size={12} /> Đã giao thành công</span>;
      case 4:
        return <span className="badge" style={{ background: 'rgba(255,46,99,0.15)', color: 'var(--accent-primary)', border: '1px solid var(--accent-primary)' }}><XCircle size={12} /> Đã hủy</span>;
      default:
        return null;
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '80px', color: 'var(--text-muted)' }}>Đang tải lịch sử đơn hàng...</div>;

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <h1 style={{ fontSize: '2.2rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Package color="var(--accent-primary)" /> ĐƠN HÀNG CỦA TÔI ({orders.length})
      </h1>

      {orders.length === 0 ? (
        <div className="glass-panel" style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>
          Bạn chưa có đơn hàng nào.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {orders.map((order) => (
            <div key={order.id} className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
                <div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Mã đơn: </span>
                  <strong style={{ fontSize: '1rem', color: 'var(--accent-primary)' }}>{order.orderCode}</strong>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginLeft: '12px' }}>
                    {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                  </span>
                </div>
                {getStatusBadge(order.status)}
              </div>

              {/* Items List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {order.items.map((item) => (
                  <div key={item.id} style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <img src={item.productImageUrl} alt={item.productName} style={{ width: '60px', height: '48px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} />
                    <div style={{ flexGrow: 1 }}>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>{item.productName}</h4>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Size EU: {item.selectedSize} x {item.quantity}</div>
                    </div>
                    <div style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: '0.95rem' }}>
                      {formatCurrency(item.totalPrice)}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: '12px', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>
                  Giao đến: <strong>{order.shippingAddress}</strong>
                </span>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Tổng cộng: </span>
                  <strong style={{ fontSize: '1.2rem', color: 'var(--accent-primary)', marginLeft: '6px' }}>
                    {formatCurrency(order.totalAmount)}
                  </strong>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};
