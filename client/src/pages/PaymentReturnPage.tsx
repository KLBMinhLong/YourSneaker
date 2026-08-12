import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle2, XCircle, ArrowRight, Package, Home } from 'lucide-react';
import { paymentApi } from '../api/paymentApi';
import { OrderResponse } from '../api/ordersApi';

export const PaymentReturnPage: React.FC = () => {
  const location = useLocation();
  const [order, setOrder] = useState<OrderResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const handleCallback = async () => {
      const query = location.search.substring(1);
      try {
        const res = await paymentApi.processVnPayReturn(query);
        setSuccess(res.success);
        setMessage(res.message);
        if (res.data) setOrder(res.data);
      } catch (err: any) {
        setSuccess(false);
        setMessage('Xử lý phản hồi thanh toán thất bại.');
      } finally {
        setLoading(false);
      }
    };

    handleCallback();
  }, [location.search]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '80px', color: 'var(--text-muted)' }}>Đang xác thực kết quả thanh toán VNPay...</div>;

  return (
    <div style={{ maxWidth: '650px', margin: '40px auto' }}>
      <div className="glass-panel" style={{ padding: '48px', textAlign: 'center' }}>
        
        {success ? (
          <>
            <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(0,242,254,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', border: '1px solid var(--accent-secondary)' }}>
              <CheckCircle2 size={42} color="var(--accent-secondary)" />
            </div>
            <h1 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '8px', color: 'var(--accent-secondary)' }}>
              THANH TOÁN VNPAY THÀNH CÔNG!
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '28px' }}>
              {message || 'Đơn hàng của bạn đã được thanh toán và cập nhật trên hệ thống.'}
            </p>
          </>
        ) : (
          <>
            <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(255,46,99,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', border: '1px solid var(--accent-primary)' }}>
              <XCircle size={42} color="var(--accent-primary)" />
            </div>
            <h1 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '8px', color: 'var(--accent-primary)' }}>
              THANH TOÁN THẤT BẠI
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '28px' }}>
              {message || 'Giao dịch thanh toán trực tuyến đã bị hủy hoặc gặp sự cố.'}
            </p>
          </>
        )}

        {order && (
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '20px', textAlign: 'left', marginBottom: '32px', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Mã đơn hàng:</span>
              <strong style={{ color: 'var(--accent-primary)' }}>{order.orderCode}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Khách hàng:</span>
              <span>{order.customerName} ({order.customerPhone})</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Tổng thanh toán:</span>
              <strong style={{ color: 'var(--accent-primary)', fontSize: '1.1rem' }}>{formatCurrency(order.totalAmount)}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Trạng thái thanh toán:</span>
              <span style={{ fontWeight: 800, color: order.isPaid ? 'var(--accent-secondary)' : 'var(--accent-primary)' }}>
                {order.isPaid ? 'Đã thanh toán (Paid)' : 'Chưa thanh toán'}
              </span>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <Link to="/my-orders" className="btn btn-outline">
            <Package size={18} /> Đơn Hàng Của Tôi
          </Link>
          <Link to="/" className="btn btn-primary">
            <Home size={18} /> Về Trang Chủ
          </Link>
        </div>

      </div>
    </div>
  );
};
