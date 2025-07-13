import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/components/Header.css';

const DefaultAvatar = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="18" cy="18" r="18" fill="#e0e7ff"/>
    <circle cx="18" cy="14" r="7" fill="#764ba2"/>
    <ellipse cx="18" cy="27" rx="10" ry="6" fill="#764ba2" fillOpacity="0.7"/>
  </svg>
);

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;
  const isLoggedIn = !!localStorage.getItem('token');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setDropdownOpen(false);
    navigate('/login');
  };

  const handleLogin = () => {
    setDropdownOpen(false);
    navigate('/login');
  };

  // Helper to handle navigation with login check
  const handleProtectedNav = (path: string) => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      navigate(path);
    }
  };

  return (
    <header className="header">
      <div className="container">
        <nav className="nav">
          <div className="nav-brand">
            <h1 style={{ cursor: 'pointer' }} onClick={() => handleProtectedNav('/')}>Your Brand</h1>
          </div>
          <ul className="nav-menu">
            <li><a href="#home" onClick={e => { e.preventDefault(); handleProtectedNav('/'); }}>Home</a></li>
            <li><a href="#about" onClick={e => { e.preventDefault(); handleProtectedNav('/'); }}>About</a></li>
            <li><a href="#services" onClick={e => { e.preventDefault(); handleProtectedNav('/'); }}>Services</a></li>
            <li><a href="#contact" onClick={e => { e.preventDefault(); handleProtectedNav('/'); }}>Contact</a></li>
            <li>
              <button
                className="nav-todo-btn"
                onClick={() => handleProtectedNav('/todo')}
              >
                ✅ Todo List
              </button>
            </li>
            <li>
              <button
                className="nav-news-btn"
                onClick={() => handleProtectedNav('/news')}
              >
                📰 News
              </button>
            </li>
          </ul>
          <div className="profile-section" ref={dropdownRef}>
            <div
              className="profile-avatar"
              onClick={() => setDropdownOpen((open) => !open)}
              style={{ cursor: 'pointer', marginLeft: 24 }}
            >
              {isLoggedIn && user && user.avatar ? (
                <img src={user.avatar} alt="avatar" style={{ width: 36, height: 36, borderRadius: '50%' }} />
              ) : (
                <DefaultAvatar />
              )}
            </div>
            {dropdownOpen && (
              <div className="profile-dropdown">
                {isLoggedIn ? (
                  <>
                    <div className="profile-info">
                      <div style={{ fontWeight: 600 }}>{user?.name || 'User'}</div>
                      <div style={{ fontSize: 12, color: '#888' }}>{user?.email}</div>
                    </div>
                    <button className="dropdown-btn" onClick={handleLogout}>Logout</button>
                  </>
                ) : (
                  <button className="dropdown-btn" onClick={handleLogin}>Login</button>
                )}
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header; 