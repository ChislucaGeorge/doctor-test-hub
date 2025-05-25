import React from 'react';
import './HomeHub.css';
import { Link } from 'react-router-dom';

const HomeHub = () => {
  return (
    <div className="home-hub-container">
      <nav className="navbar">
        <div className="logo">Health-Hub</div>
        <div className="nav-links">
          <Link to="/about"><button className="nav-btn">About</button></Link>
          <Link to="/collection"><button className="nav-btn">My Collection</button></Link>
          <button className="nav-btn">Community</button>
          <Link to="/profile"><button className="nav-btn">Profile</button></Link>
        </div>
      </nav>
  
      <main className="main-content">
        <div className="hero-section">
          <div className="hero-text">
            <h1>Connecting Care Everywhere</h1>
            <p>Access expert advice, track health, and stay connected</p>
          </div>
          <div className="hero-image-container">
            <img src="/Images/HomeHub-bg.png" alt="Doctor Visual" className="hero-image" />
          </div>
        </div>
  
        <section className="chat-placeholder">
          <h2>Community Live Chat</h2>
          <div className="chat-box">
            <p><i>💬 Doctor Q&A Chat Coming Soon</i></p>
          </div>
        </section>
      </main>
    </div>
  );  
};

export default HomeHub;
