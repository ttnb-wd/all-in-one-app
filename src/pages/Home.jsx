import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Hi, I'm <span className="highlight">Your Name</span></h1>
        <h2>Full Stack Developer</h2>
        <p className="hero-text">
          I build exceptional digital experiences with modern web technologies.
          Focused on creating responsive, user-friendly applications with clean code.
        </p>
        <div className="cta-buttons">
          <Link to="/portfolio" className="cta-button primary">
            View My Work <FaArrowRight />
          </Link>
          <Link to="/contact" className="cta-button secondary">
            Get In Touch
          </Link>
        </div>
      </div>
      
      <div className="featured-section">
        <h3>Featured Projects</h3>
        <div className="featured-grid">
          <div className="featured-item">
            <h4>Weather App</h4>
            <p>Real-time weather information with beautiful UI</p>
            <Link to="/portfolio" className="featured-link">Learn More</Link>
          </div>
          <div className="featured-item">
            <h4>Space Invaders</h4>
            <p>Classic arcade game with modern twist</p>
            <Link to="/portfolio" className="featured-link">Learn More</Link>
          </div>
          <div className="featured-item">
            <h4>Social Dashboard</h4>
            <p>Analytics and social media management</p>
            <Link to="/portfolio" className="featured-link">Learn More</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 