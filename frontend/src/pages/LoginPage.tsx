import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [validationError, setValidationError] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    if (!validateEmail(email)) return 'Invalid email format.';
    if (!password) return 'Password is required.';
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const vError = validateForm();
    if (vError) {
      setValidationError(vError);
      return;
    }
    setValidationError('');
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data));
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 8px 32px rgba(102,126,234,0.15)', padding: 40, width: 350, maxWidth: '90%' }}>
        <h1 style={{ textAlign: 'center', color: '#764ba2', marginBottom: 24 }}>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            required
            style={{ display: 'block', marginBottom: 16, width: '100%', padding: 12, borderRadius: 8, border: '1px solid #e0e0e0', fontSize: 16 }}
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            required
            style={{ display: 'block', marginBottom: 16, width: '100%', padding: 12, borderRadius: 8, border: '1px solid #e0e0e0', fontSize: 16 }}
          />
          <button type="submit" style={{ width: '100%', padding: 12, borderRadius: 8, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff', fontWeight: 600, fontSize: 16, border: 'none', marginBottom: 8, cursor: 'pointer', boxShadow: '0 2px 8px rgba(102,126,234,0.10)' }}>Login</button>
        </form>
        {validationError && <div style={{ color: 'red', marginTop: 8, textAlign: 'center' }}>{validationError}</div>}
        {error && <div style={{ color: 'red', marginTop: 8, textAlign: 'center' }}>{error}</div>}
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <span style={{ color: '#888' }}>Don't have an account? </span>
          <Link to="/register" style={{ color: '#764ba2', fontWeight: 600, textDecoration: 'none' }}>Register</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 