import React from 'react';
import Header from '../components/layout/Header';
import MainContent from '../components/layout/MainContent';
import Footer from '../components/layout/Footer';
import '../styles/pages/LandingPage.css';

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
};

export default LandingPage; 