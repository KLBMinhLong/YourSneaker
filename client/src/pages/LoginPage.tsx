import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Flame, ArrowRight, Lock, Mail } from 'lucide-react';
import { api } from '../api/axios';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await api.post('/auth/login', { email, password });
      if (res.data.success) {
        const authData = res.data.data;
        const accessToken = authData.accessToken;
        
        // Save token and full user object to localStorage
        localStorage.setItem('token', accessToken);
        localStorage.setItem('user', JSON.stringify(authData));

        const isAdmin = 
          authData.role === 'Admin' ||
          authData.role === 1 ||
          authData.role === '1' ||
          authData.email?.toLowerCase() === 'admin@yoursneaker.com';

        if (isAdmin) {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } else {
        setError(res.data.message || 'Đăng nhập thất bại.');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Có lỗi xảy ra khi kết nối máy chủ.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '440px', margin: '40px auto', width: '100%' }}>
      <div className="glass-panel" style={{ padding: '40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ width: '48px', height: '48px', background: 'var(--accent-primary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: 'var(--shadow-glow)' }}>
            <Flame color="#FFF" size={28} />
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 900 }}>ĐĂNG NHẬP</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '4px' }}>
            Chào mừng quay trở lại với YourSneaker
          </p>
        </div>

        {error && (
          <div style={{ padding: '12px', borderRadius: 'var(--radius-sm)', background: 'rgba(255,46,99,0.15)', border: '1px solid rgba(255,46,99,0.3)', color: 'var(--accent-primary)', fontSize: '0.85rem', marginBottom: '20px', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-secondary)' }}>EMAIL</label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@yoursneaker.com"
                style={{ width: '100%', padding: '12px 16px 12px 40px', borderRadius: 'var(--radius-sm)', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', outline: 'none' }}
              />
              <Mail size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-secondary)' }}>MẬT KHẨU</label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{ width: '100%', padding: '12px 16px 12px 40px', borderRadius: 'var(--radius-sm)', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', outline: 'none' }}
              />
              <Lock size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: '100%', padding: '14px', marginTop: '10px' }}>
            {loading ? 'ĐANG XỬ LÝ...' : 'ĐĂNG NHẬP'} <ArrowRight size={18} />
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          Chưa có tài khoản? <Link to="/register" style={{ color: 'var(--accent-secondary)', fontWeight: 700 }}>Đăng ký ngay</Link>
        </div>
      </div>
    </div>
  );
};
