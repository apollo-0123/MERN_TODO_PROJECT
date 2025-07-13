import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

const RegisterPage: React.FC = () => {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [validationError, setValidationError] = useState('');
  const navigate = useNavigate();

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        setValidationError('Avatar must be a JPG or PNG image.');
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        setValidationError('Avatar must be less than 2MB.');
        return;
      }
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
      setValidationError('');
    }
  };

  const validateForm = () => {
    if (!name.trim()) return 'Name is required.';
    if (!validateEmail(email)) return 'Invalid email format.';
    if (password.length < 6) return 'Password must be at least 6 characters.';
    if (avatarFile && !['image/jpeg', 'image/png'].includes(avatarFile.type)) return 'Avatar must be a JPG or PNG image.';
    if (avatarFile && avatarFile.size > 2 * 1024 * 1024) return 'Avatar must be less than 2MB.';
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const vError = validateForm();
    if (vError) {
      setValidationError(vError);
      return;
    }
    setValidationError('');
    try {
      await axios.post('/api/auth/register', { name, email, password, avatar });
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 8px 32px rgba(102,126,234,0.15)', padding: 40, width: 370, maxWidth: '90%' }}>
        <h1 style={{ textAlign: 'center', color: '#764ba2', marginBottom: 24 }}>Create Account</h1>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 16 }}>
            <label htmlFor="avatar-upload" style={{ cursor: 'pointer' }}>
              {avatar ? (
                <img src={avatar} alt="avatar" style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover', border: '2px solid #764ba2' }} />
              ) : (
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, color: '#764ba2', border: '2px solid #eee' }}>+</div>
              )}
              <input id="avatar-upload" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleAvatarChange} />
            </label>
          </div>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Name"
            required
            style={{ display: 'block', marginBottom: 16, width: '100%', padding: 12, borderRadius: 8, border: '1px solid #e0e0e0', fontSize: 16 }}
          />
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
          <button type="submit" style={{ width: '100%', padding: 12, borderRadius: 8, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff', fontWeight: 600, fontSize: 16, border: 'none', marginBottom: 8, cursor: 'pointer', boxShadow: '0 2px 8px rgba(102,126,234,0.10)' }}>Register</button>
        </form>
        {validationError && <div style={{ color: 'red', marginTop: 8, textAlign: 'center' }}>{validationError}</div>}
        {error && <div style={{ color: 'red', marginTop: 8, textAlign: 'center' }}>{error}</div>}
        {success && <div style={{ color: 'green', marginTop: 8, textAlign: 'center' }}>{success}</div>}
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <span style={{ color: '#888' }}>Already have an account? </span>
          <Link to="/login" style={{ color: '#764ba2', fontWeight: 600, textDecoration: 'none' }}>Login</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage; 