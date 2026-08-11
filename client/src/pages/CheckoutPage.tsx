import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight, CreditCard, Truck, User, Phone, MapPin, FileText } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { ordersApi } from '../api/ordersApi';

export const CheckoutPage: React.FC = () => {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [note, setNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<number>(0); // 0 = COD, 1 = VNPay
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  if (items.length === 0) {
    return (
      <div className="glass-panel" style={{ textAlign: 'center', padding: '60px', maxWidth: '500px', margin: '40px auto' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '16px' }}>GIỎ HÀNG RỖNG</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Bạn cần chọn sản phẩm trước khi tiến hành thanh toán.</p>
        <Link to="/products" className="btn btn-primary">Xem Sản Phẩm</Link>
      </div>
    );
  }

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Vui lòng đăng nhập tài khoản trước khi đặt hàng.');
      setTimeout(() => navigate('/login'), 1500);
      return;
    }

    setLoading(true);

    try {
      const orderPayload = {
        customerName,
        customerPhone,
        shippingAddress,
        note,
        paymentMethod,
        items: items.map((i) => ({
          productId: i.product.id,
          selectedSize: i.selectedSize,
          quantity: i.quantity,
        })),
      };

      const res = await ordersApi.createOrder(orderPayload);
      if (res.success && res.data) {
        clearCart();
        navigate(`/order-success/${res.data.id}`);
      } else {
        setError(res.message || 'Đặt hàng thất bại, vui lòng thử lại.');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Không thể tạo đơn hàng. Vui lòng đăng nhập hoặc kiểm tra thông tin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <h1 style={{ fontSize: '2.2rem', fontWeight: 900 }}>THANH TOÁN ĐƠN HÀNG</h1>

      {error && (
        <div style={{ padding: '16px', borderRadius: 'var(--radius-sm)', background: 'rgba(255,46,99,0.15)', border: '1px solid rgba(255,46,99,0.3)', color: 'var(--accent-primary)', fontWeight: 600 }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmitOrder} style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '32px' }}>
        
        {/* Customer Information Form */}
        <div className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <User color="var(--accent-primary)" size={20} /> THÔNG TIN GIAO HÀNG
          </h3>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-secondary)' }}>HỌ VÀ TÊN KHÁCH HÀNG *</label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Nguyễn Văn A"
                style={{ width: '100%', padding: '12px 16px 12px 40px', borderRadius: 'var(--radius-sm)', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', outline: 'none' }}
              />
              <User size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-secondary)' }}>SỐ ĐIỆN THOẠI *</label>
            <div style={{ position: 'relative' }}>
              <input
                type="tel"
                required
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="0987 654 321"
                style={{ width: '100%', padding: '12px 16px 12px 40px', borderRadius: 'var(--radius-sm)', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', outline: 'none' }}
              />
              <Phone size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-secondary)' }}>ĐỊA CHỈ NHẬN HÀNG *</label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                required
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                placeholder="Số nhà, Tên đường, Phường/Xã, Quận/Huyện, Tỉnh/TP"
                style={{ width: '100%', padding: '12px 16px 12px 40px', borderRadius: 'var(--radius-sm)', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', outline: 'none' }}
              />
              <MapPin size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-secondary)' }}>GHI CHÚ ĐƠN HÀNG (TÙY CHỌN)</label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Giao giờ hành chính, gọi trước khi giao..."
                style={{ width: '100%', padding: '12px 16px 12px 40px', borderRadius: 'var(--radius-sm)', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', outline: 'none' }}
              />
              <FileText size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          {/* Payment Method Selector */}
          <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '20px' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CreditCard color="var(--accent-secondary)" size={18} /> PHƯƠNG THỨC THANH TOÁN
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 18px',
                  borderRadius: 'var(--radius-sm)',
                  border: paymentMethod === 0 ? '2px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                  background: paymentMethod === 0 ? 'rgba(255,46,99,0.1)' : 'rgba(255,255,255,0.04)',
                  cursor: 'pointer'
                }}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 0}
                  onChange={() => setPaymentMethod(0)}
                />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Thanh toán khi nhận hàng (COD)</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Trả tiền mặt trực tiếp cho shipper khi nhận đôi sneaker</div>
                </div>
              </label>

              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 18px',
                  borderRadius: 'var(--radius-sm)',
                  border: paymentMethod === 1 ? '2px solid var(--accent-secondary)' : '1px solid var(--border-subtle)',
                  background: paymentMethod === 1 ? 'rgba(0,242,254,0.1)' : 'rgba(255,255,255,0.04)',
                  cursor: 'pointer'
                }}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 1}
                  onChange={() => setPaymentMethod(1)}
                />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--accent-secondary)' }}>Cổng thanh toán VNPay (Chuyển khoản / QR Code)</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Thanh toán tức thì qua thẻ ngân hàng hoặc Ví điện tử</div>
                </div>
              </label>
            </div>
          </div>

        </div>

        {/* Order Summary Sidebar */}
        <div className="glass-panel" style={{ padding: '28px', height: 'fit-content', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, borderBottom: '1px solid var(--border-subtle)', paddingBottom: '16px' }}>TỔNG QUAN ĐƠN HÀNG</h3>

          {/* Items Summary list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '240px', overflowY: 'auto' }}>
            {items.map(({ product, quantity, selectedSize }) => (
              <div key={`${product.id}-${selectedSize}`} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <img src={product.imageUrl} alt={product.name} style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} />
                <div style={{ flexGrow: 1 }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>{product.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Size {selectedSize} x {quantity}</div>
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent-primary)' }}>
                  {formatCurrency(product.price * quantity)}
                </div>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 900 }}>
            <span>Thành tiền:</span>
            <span style={{ color: 'var(--accent-primary)' }}>{formatCurrency(getTotalPrice())}</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{ width: '100%', padding: '16px', fontSize: '1rem' }}
          >
            {loading ? 'ĐANG XỬ LÝ...' : 'XÁC NHẬN ĐẶT HÀNG'} <ArrowRight size={18} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>
            <ShieldCheck size={14} color="var(--accent-secondary)" /> Thông tin được bảo mật chuẩn SSL
          </div>
        </div>

      </form>
    </div>
  );
};
