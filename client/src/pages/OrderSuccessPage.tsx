import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Package, Home } from 'lucide-react';
import { ordersApi, OrderResponse } from '../api/ordersApi';

export const OrderSuccessPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<OrderResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) return;
      try {
        const res = await ordersApi.getOrderById(orderId);
        if (res.success && res.data) setOrder(res.data);
      } catch (err) {
        console.error('Failed to load order:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '80px', color: 'var(--text-muted)' }}>Đang tải hóa đơn...</div>;

  return (
    <div style={{ maxWidth: '700px', margin: '40px auto' }}>
      <div className="glass-panel" style={{ padding: '48px', textAlign: 'center' }}>
        
        <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(0,242,254,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', border: '1px solid var(--accent-secondary)' }}>
          <CheckCircle2 size={42} color="var(--accent-secondary)" />
        </div>

        <h1 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '8px' }}>CẢM ƠN BẠN ĐÃ ĐẶT HÀNG!</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '28px' }}>
          Đơn hàng của bạn đã được tiếp nhận và đang tiến hành đóng gói.
        </p>

        {order && (
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '24px', textAlign: 'left', marginBottom: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>MÃ ĐƠN HÀNG:</span>
              <strong style={{ color: 'var(--accent-primary)', fontSize: '1rem', letterSpacing: '0.05em' }}>{order.orderCode}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Người nhận:</span>
              <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{order.customerName} ({order.customerPhone})</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Địa chỉ:</span>
              <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{order.shippingAddress}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Phương thức:</span>
              <span style={{ color: 'var(--accent-secondary)', fontWeight: 700 }}>
                {order.paymentMethod === 0 ? 'Thanh toán COD' : 'VNPay Online'}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '12px', fontSize: '1.1rem', fontWeight: 900 }}>
              <span>Tổng thanh toán:</span>
              <span style={{ color: 'var(--accent-primary)' }}>{formatCurrency(order.totalAmount)}</span>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <Link to="/my-orders" className="btn btn-outline">
            <Package size={18} /> Xem Đơn Hàng
          </Link>
          <Link to="/" className="btn btn-primary">
            <Home size={18} /> Về Trang Chủ
          </Link>
        </div>

      </div>
    </div>
  );
};
