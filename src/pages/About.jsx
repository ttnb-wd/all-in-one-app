import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <h1>About Me</h1>
      <div className="about-content">
        <div className="about-text">
          <p>
            Hello! I'm a passionate web developer with expertise in building modern,
            responsive web applications. I specialize in React, JavaScript, and
            creating beautiful user interfaces.
          </p>
          <p>
            My journey in web development started with a curiosity for creating
            interactive experiences. Today, I focus on writing clean, efficient code
            and building user-friendly applications.
          </p>
        </div>
        <div className="skills-section">
          <h2>Skills</h2>
          <div className="skills-grid">
            <div className="skill-item">
              <h3>Frontend</h3>
              <ul>
                <li>React.js</li>
                <li>JavaScript (ES6+)</li>
                <li>HTML5 & CSS3</li>
                <li>Responsive Design</li>
              </ul>
            </div>
            <div className="skill-item">
              <h3>Backend</h3>
              <ul>
                <li>Node.js</li>
                <li>Express</li>
                <li>RESTful APIs</li>
                <li>MongoDB</li>
              </ul>
            </div>
            <div className="skill-item">
              <h3>Tools</h3>
              <ul>
                <li>Git & GitHub</li>
                <li>VS Code</li>
                <li>Webpack</li>
                <li>npm/yarn</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 