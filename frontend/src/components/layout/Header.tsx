import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const DefaultAvatar = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="18" cy="18" r="18" fill="#e0e7ff"/>
    <circle cx="18" cy="14" r="7" fill="#764ba2"/>
    <ellipse cx="18" cy="27" rx="10" ry="6" fill="#764ba2" fillOpacity="0.7"/>
  </svg>
);

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [menuDropdownOpen, setMenuDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;
  const isLoggedIn = !!localStorage.getItem('token');
  const menuDropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  // Close menu dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuDropdownRef.current && !menuDropdownRef.current.contains(event.target as Node)) {
        setMenuDropdownOpen(false);
      }
    }
    if (menuDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuDropdownOpen]);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    }
    if (profileDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [profileDropdownOpen]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setProfileDropdownOpen(false);
    navigate('/login');
  };

  const handleLogin = () => {
    setProfileDropdownOpen(false);
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

  // Only one dropdown open at a time
  const handleMenuDropdown = () => {
    setMenuDropdownOpen(open => !open);
    setProfileDropdownOpen(false);
  };
  const handleProfileDropdown = () => {
    setProfileDropdownOpen(open => !open);
    setMenuDropdownOpen(false);
  };

  return (
    <header className="header">
      <div className="container">
        <nav className="nav">
          <div className="nav-brand" style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <h1 style={{ cursor: 'pointer', margin: 0, fontWeight: 800, fontSize: '2rem', letterSpacing: '0.01em' }} onClick={() => handleProtectedNav('/')}>Your Brand</h1>
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
                Plans
              </button>
            </li>
          </ul>
          {/* BEAUTIFUL DROPDOWN BUTTON START */}
          <div className="custom-dropdown" ref={menuDropdownRef}>
            <button
              className="dropdown-toggle"
              onClick={handleMenuDropdown}
              aria-haspopup="true"
              aria-expanded={menuDropdownOpen}
            >
              <span style={{marginRight: 8, fontWeight: 600}}>Menu</span>
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{verticalAlign: 'middle'}}>
                <path d="M5 8L10 13L15 8" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {menuDropdownOpen && (
              <div className="dropdown-menu">
                <div className="dropdown-item" tabIndex={0} onClick={() => setMenuDropdownOpen(false)}>
                  <span role="img" aria-label="star" style={{marginRight: 8}}>⭐</span>Item 1
                </div>
                <div className="dropdown-item" tabIndex={0} onClick={() => setMenuDropdownOpen(false)}>
                  <span role="img" aria-label="rocket" style={{marginRight: 8}}>🚀</span>Item 2
                </div>
                <div className="dropdown-item" tabIndex={0} onClick={() => setMenuDropdownOpen(false)}>
                  <span role="img" aria-label="bulb" style={{marginRight: 8}}>💡</span>Item 3
                </div>
                <div className="dropdown-item" tabIndex={0} onClick={() => setMenuDropdownOpen(false)}>
                  <span role="img" aria-label="heart" style={{marginRight: 8}}>❤️</span>Item 4
                </div>
              </div>
            )}
          </div>
          {/* BEAUTIFUL DROPDOWN BUTTON END */}
          <div className="profile-section" ref={profileDropdownRef}>
            <div
              className="profile-avatar"
              onClick={handleProfileDropdown}
              style={{ cursor: 'pointer', marginLeft: 24 }}
              tabIndex={0}
              aria-haspopup="true"
              aria-expanded={profileDropdownOpen}
            >
              {isLoggedIn && user && user.avatar ? (
                <img src={user.avatar} alt="avatar" style={{ width: 36, height: 36, borderRadius: '50%' }} />
              ) : (
                <DefaultAvatar />
              )}
            </div>
            {profileDropdownOpen && (
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