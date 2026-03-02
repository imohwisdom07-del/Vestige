import React from 'react';
import { Link } from 'react-router-dom'; // Add this for navigation
import './HeroGate.css';

const HeroGate = () => {
  return (
    <div className="hero-gate">
      <div className="video-wrapper">
        <video autoPlay loop muted playsInline className="bg-video">
          <source src="/Videos/Vestige-homepage.mp4" type="video/mp4" />
        </video>
        <div className="overlay"></div>
      </div>

      <div className="gate-content">
        <h1 className="logo-title">VESTIGE</h1>
        
        <div className="category-selection">
          {/* Use Link to navigate to your collection */}
          <Link to="/collection/women">
            <button className="gate-btn">SHOP_WOMEN</button>
          </Link>
          
          <div className="vertical-line"></div>
          
          <Link to="/collection/men">
            <button className="gate-btn">SHOP_MEN</button>
          </Link>
        </div>
        
        <p className="scroll-explorer">EXPLORE_ARCHIVE_01</p>
      </div>
    </div>
  );
};

export default HeroGate;