import React from 'react';
import '../../styles/components/MainContent.css';

const MainContent: React.FC = () => {
  return (
    <main className="main-content">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Welcome to Our Platform</h1>
            <p className="hero-subtitle">
              Discover amazing features and solutions that will transform your experience
            </p>
            <button className="cta-button">Get Started</button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features py-16">
        <div className="container">
          <h2 className="section-title text-center mb-8">Our Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🚀</div>
              <h3>Fast Performance</h3>
              <p>Lightning-fast loading times and smooth interactions.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🛡️</div>
              <h3>Secure & Reliable</h3>
              <p>Your data is protected with enterprise-grade security.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💡</div>
              <h3>Smart Solutions</h3>
              <p>Intelligent features that adapt to your needs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about py-16">
        <div className="container">
          <div className="about-content">
            <h2 className="section-title mb-4">About Us</h2>
            <p className="about-text">
              We are passionate about creating innovative solutions that help businesses 
              and individuals achieve their goals. Our team of experts works tirelessly 
              to deliver exceptional experiences and cutting-edge technology.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MainContent; 