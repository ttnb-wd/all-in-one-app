import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaLaptop, FaMobile, FaServer, FaDatabase, FaPalette, FaRocket, FaLightbulb, FaHeart, FaCoffee, FaGamepad, FaCamera } from 'react-icons/fa';
import './About.css';

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  const skillCategories = [
    {
      title: "Frontend",
      icon: <FaLaptop />,
      color: "#61DAFB",
      skills: ["React.js", "JavaScript (ES6+)","HTML5 & CSS3", "Responsive Design", "Framer Motion"]
    },
    
    {
      title: "Tools & Design",
      icon: <FaPalette />,
      color: "#FF6B6B",
      skills: ["Git & GitHub", "Docker", "AWS", "Figma", "Photoshop", "Webpack"]
    }
  ];

  const personalStats = [
    { number: "14", label: "Projects Completed", icon: <FaRocket /> },
    { number: "1+", label: "Years Experience", icon: <FaCode /> },
   
    { number: "100%", label: "Passion for Coding", icon: <FaHeart /> }
  ];

  const interests = [
    { name: "Web Development", icon: <FaCode />, color: "#64ffda" },
    { name: "Gaming", icon: <FaGamepad />, color: "#FF6B6B" },
    { name: "Photography", icon: <FaCamera />, color: "#4ECDC4" },
    { name: "Coffee Brewing", icon: <FaCoffee />, color: "#F7DC6F" }
  ];

  return (
    <motion.div 
      className="about-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="about-header" variants={itemVariants}>
        <h1>About Me</h1>
        <div className="header-underline"></div>
      </motion.div>

      <div className="about-content">
        <motion.div className="bio-section" variants={itemVariants}>
          <div className="bio-grid">
            <div className="bio-text">
              <motion.div 
                className="profile-image"
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                whileHover={{ scale: 1.05, rotate: 2 }}
              >
                <img src="" 
                     alt="Profile" />
              </motion.div>
              
              <motion.div 
                className="bio-content"
                variants={itemVariants}
              >
                <h2>Hello! I'm Shin Htet Maung</h2>
                <p className="bio-intro">
                   Motivated and detail-oriented Junior Front-End Web Developer with a strong
                   foundation in HTML, CSS, JavaScript, and responsive design. Eager to
                   contribute to a dynamic team by creating user-friendly, visually appealing,
                   and high-performing websites. Passionate about learning new technologies
                   and improving user experiences.
                </p>

                <div className="bio-highlights">
                  <div className="highlight-item">
                    <strong>Location:</strong> Sanchaung Township. Yangon, Myanmar
                  </div>
                  <div className="highlight-item">
                    <strong>Available for:</strong> Freelance & Full-time opportunities
                  </div>
                  <div className="highlight-item">
                    <strong>Expertise:</strong> Frontend Development, UI/UX Design
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Personal Stats */}
        <motion.div className="stats-section" variants={itemVariants}>
          <h2>By the Numbers</h2>
          <div className="stats-grid">
            {personalStats.map((stat, index) => (
              <motion.div 
                key={stat.label}
                className="stat-item"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.1, y: -10 }}
                viewport={{ once: true }}
              >
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Skills Section */}
        <motion.div className="skills-section" variants={itemVariants}>
          <h2>Technical Skills</h2>
          <div className="skills-grid">
            {skillCategories.map((category, index) => (
              <motion.div 
                key={category.title}
                className="skill-category"
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                viewport={{ once: true }}
              >
                <div className="category-header" style={{ '--category-color': category.color }}>
                  <div className="category-icon">{category.icon}</div>
                  <h3>{category.title}</h3>
                </div>
                <ul className="category-skills">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.li 
                      key={skill}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: (index * 0.2) + (skillIndex * 0.1) + 0.3 }}
                      viewport={{ once: true }}
                    >
                      {skill}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Interests Section */}
        <motion.div className="interests-section" variants={itemVariants}>
          <h2>When I'm Not Coding</h2>
          <div className="interests-grid">
            {interests.map((interest, index) => (
              <motion.div 
                key={interest.name}
                className="interest-item"
                initial={{ y: 50, opacity: 0, rotate: -5 }}
                whileInView={{ y: 0, opacity: 1, rotate: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                viewport={{ once: true }}
                style={{ '--interest-color': interest.color }}
              >
                <div className="interest-icon">{interest.icon}</div>
                <span className="interest-name">{interest.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Fun Facts */}
        <motion.div className="fun-facts-section" variants={itemVariants}>
          <h2>Fun Facts</h2>
          <div className="fun-facts-grid">
            <motion.div 
              className="fun-fact"
              whileHover={{ scale: 1.05 }}
            >
              <div className="fact-emoji">☕</div>
              <p>I drink an average of 1 cup of coffee per month</p>
            </motion.div>
            <motion.div 
              className="fun-fact"
              whileHover={{ scale: 1.05 }}
            >
              <div className="fact-emoji">🌙</div>
              <p>I do my best coding between  9AM and 2PM</p>
            </motion.div>
            <motion.div 
              className="fun-fact"
              whileHover={{ scale: 1.05 }}
            >
              <div className="fact-emoji">🎮</div>
              <p>FIFA rage = Dota throw, same energy</p>
            </motion.div>
            <motion.div 
              className="fun-fact"
              whileHover={{ scale: 1.05 }}
            >
              <div className="fact-emoji">📚</div>
              <p>I read at least one tech article every morning</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About; 