import React from 'react';
import './SocialDashboard.css';
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

function SocialDashboard() {
  const socialStats = {
    twitter: {
      followers: '12.8K',
      engagement: '3.2K',
      growth: '+2.4%'
    },
    facebook: {
      followers: '24.5K',
      engagement: '5.7K',
      growth: '+1.8%'
    },
    instagram: {
      followers: '18.2K',
      engagement: '4.9K',
      growth: '+4.2%'
    },
    linkedin: {
      followers: '8.6K',
      engagement: '2.1K',
      growth: '+3.1%'
    }
  };

  return (
    <div className="social-dashboard">
      <h1>Social Media Dashboard</h1>
      
      <div className="stats-grid">
        <div className="stat-card twitter">
          <div className="platform-header">
            <FaTwitter />
            <h3>Twitter</h3>
          </div>
          <div className="stats">
            <div className="stat">
              <p className="number">{socialStats.twitter.followers}</p>
              <p className="label">Followers</p>
            </div>
            <div className="stat">
              <p className="number">{socialStats.twitter.engagement}</p>
              <p className="label">Engagement</p>
            </div>
            <p className="growth">{socialStats.twitter.growth}</p>
          </div>
        </div>

        <div className="stat-card facebook">
          <div className="platform-header">
            <FaFacebook />
            <h3>Facebook</h3>
          </div>
          <div className="stats">
            <div className="stat">
              <p className="number">{socialStats.facebook.followers}</p>
              <p className="label">Followers</p>
            </div>
            <div className="stat">
              <p className="number">{socialStats.facebook.engagement}</p>
              <p className="label">Engagement</p>
            </div>
            <p className="growth">{socialStats.facebook.growth}</p>
          </div>
        </div>

        <div className="stat-card instagram">
          <div className="platform-header">
            <FaInstagram />
            <h3>Instagram</h3>
          </div>
          <div className="stats">
            <div className="stat">
              <p className="number">{socialStats.instagram.followers}</p>
              <p className="label">Followers</p>
            </div>
            <div className="stat">
              <p className="number">{socialStats.instagram.engagement}</p>
              <p className="label">Engagement</p>
            </div>
            <p className="growth">{socialStats.instagram.growth}</p>
          </div>
        </div>

        <div className="stat-card linkedin">
          <div className="platform-header">
            <FaLinkedin />
            <h3>LinkedIn</h3>
          </div>
          <div className="stats">
            <div className="stat">
              <p className="number">{socialStats.linkedin.followers}</p>
              <p className="label">Followers</p>
            </div>
            <div className="stat">
              <p className="number">{socialStats.linkedin.engagement}</p>
              <p className="label">Engagement</p>
            </div>
            <p className="growth">{socialStats.linkedin.growth}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SocialDashboard; 