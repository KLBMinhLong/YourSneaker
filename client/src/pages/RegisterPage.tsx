import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Flame, ArrowRight, Lock, Mail, User as UserIcon, Phone } from 'lucide-react';
import { api } from '../api/axios';

export const RegisterPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Mật khẩu nhập lại không khớp.');
      return;
    }

    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự.');
      return;
    }

    setLoading(true);

    try {
      const res = await api.post('/auth/register', {
        email,
        password,
        fullName,
        phone
      });

      if (res.data.success) {
        const authData = res.data.data;
        localStorage.setItem('token', authData.accessToken);
        localStorage.setItem('user', JSON.stringify(authData));
        navigate('/');
      } else {
        setError(res.data.message || 'Đăng ký thất bại.');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Có lỗi xảy ra khi kết nối máy chủ.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '480px', margin: '40px auto', width: '100%' }}>
      <div className="glass-panel" style={{ padding: '40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ width: '48px', height: '48px', background: 'var(--accent-primary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: 'var(--shadow-glow)' }}>
            <Flame color="#FFF" size={28} />
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 900 }}>TẠO TÀI KHOẢN</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '4px' }}>
            Tham gia cộng đồng YourSneaker ngay hôm nay
          </p>
        </div>

        {error && (
          <div style={{ padding: '12px', borderRadius: 'var(--radius-sm)', background: 'rgba(255,46,99,0.15)', border: '1px solid rgba(255,46,99,0.3)', color: 'var(--accent-primary)', fontSize: '0.85rem', marginBottom: '20px', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-secondary)' }}>HỌ VÀ TÊN</label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Nguyễn Văn A"
                style={{ width: '100%', padding: '12px 16px 12px 40px', borderRadius: 'var(--radius-sm)', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', outline: 'none' }}
              />
              <UserIcon size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-secondary)' }}>EMAIL</label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
                style={{ width: '100%', padding: '12px 16px 12px 40px', borderRadius: 'var(--radius-sm)', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', outline: 'none' }}
              />
              <Mail size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-secondary)' }}>SỐ ĐIỆN THOẠI</label>
            <div style={{ position: 'relative' }}>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0987654321"
                style={{ width: '100%', padding: '12px 16px 12px 40px', borderRadius: 'var(--radius-sm)', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', outline: 'none' }}
              />
              <Phone size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-secondary)' }}>MẬT KHẨU</label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ít nhất 6 ký tự"
                style={{ width: '100%', padding: '12px 16px 12px 40px', borderRadius: 'var(--radius-sm)', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', outline: 'none' }}
              />
              <Lock size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-secondary)' }}>XÁC NHẬN MẬT KHẨU</label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Nhập lại mật khẩu"
                style={{ width: '100%', padding: '12px 16px 12px 40px', borderRadius: 'var(--radius-sm)', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', outline: 'none' }}
              />
              <Lock size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: '100%', padding: '14px', marginTop: '10px' }}>
            {loading ? 'ĐANG ĐĂNG KÝ...' : 'ĐĂNG KÝ NGAY'} <ArrowRight size={18} />
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          Đã có tài khoản? <Link to="/login" style={{ color: 'var(--accent-secondary)', fontWeight: 700 }}>Đăng nhập ngay</Link>
        </div>
      </div>
    </div>
  );
};
