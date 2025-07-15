import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { FaArrowRight, FaDownload, FaGithub, FaLinkedin, FaTwitter, FaCode, FaLaptop, FaMobile } from 'react-icons/fa';
import './Home.css';

const Home = () => {
  const [displayText, setDisplayText] = useState('');
  const fullText = "Junior Front-End Developer";
  const controls = useAnimation();

  useEffect(() => {
    let i = 0;
    const typeWriter = () => {
      if (i < fullText.length) {
        setDisplayText(fullText.substring(0, i + 1));
        i++;
        setTimeout(typeWriter, 100);
      }
    };
    
    const timer = setTimeout(typeWriter, 1000);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
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

  const floatingVariants = {
    float: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const skills = [
    { name: 'React', icon: <FaCode />, color: '#61DAFB' },
    { name: 'JavaScript', icon: <FaCode />, color: '#F7DF1E' },
    { name: 'Responsive Design', icon: <FaMobile />, color: '#64ffda' },
    { name: 'HTML/CSS', icon: <FaLaptop />, color: '#E34F26' }
  ];

  return (
    <motion.div 
      className="home-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="hero-section">
        <motion.div className="floating-elements" variants={floatingVariants} animate="float">
          <div className="floating-shape shape-1"></div>
          <div className="floating-shape shape-2"></div>
          <div className="floating-shape shape-3"></div>
        </motion.div>

        <motion.p variants={itemVariants} className="intro-text">
          Hi, my name is
        </motion.p>
        
        <motion.h1 variants={itemVariants}>
          <span className="highlight">Shin Htet Maung</span>
        </motion.h1>
        
        <motion.h2 variants={itemVariants} className="typing-text">
          {displayText}<span className="cursor">|</span>
        </motion.h2>
        
        <motion.p variants={itemVariants} className="hero-text">
          I'm a passionate developer who specializes in building exceptional digital experiences. 
          Currently focused on creating responsive, user-friendly web applications with modern technologies
          like React, JavaScript, and cutting-edge design principles.
        </motion.p>

        <motion.div variants={itemVariants} className="skills-preview">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="skill-badge"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 1.5 + index * 0.1 }}
              whileHover={{ scale: 1.1 }}
              style={{ '--skill-color': skill.color }}
            >
              {skill.icon}
              <span>{skill.name}</span>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div variants={itemVariants} className="cta-buttons">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/portfolio" className="cta-button primary">
              View My Work <FaArrowRight />
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/resume" className="cta-button secondary">
              <FaDownload /> Download Resume
            </Link>
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants} className="social-links">
          <motion.a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaGithub />
          </motion.a>
          <motion.a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaLinkedin />
          </motion.a>
          <motion.a 
            href="https://twitter.com" 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaTwitter />
          </motion.a>
        </motion.div>
      </div>
      
      <motion.div 
        className="featured-section"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.h3
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Featured Projects
        </motion.h3>
        <div className="featured-grid">
          {[
            {
              title: "Weather App",
              description: "Real-time weather information with beautiful UI and location-based forecasting",
              link: "/apps/weather",
              delay: 0
            },
            {
              title: "Space Invaders",
              description: "Classic arcade game recreated with modern web technologies and smooth animations",
              link: "/games/space-invaders",
              delay: 0.2
            },
            {
              title: "Social Dashboard",
              description: "Analytics and social media management platform with real-time data visualization",
              link: "/portfolio",
              delay: 0.4
            }
          ].map((project, index) => (
            <motion.div
              key={project.title}
              className="featured-item"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: project.delay }}
              whileHover={{ 
                y: -10, 
                scale: 1.03,
                transition: { duration: 0.2 }
              }}
              viewport={{ once: true }}
            >
              <h4>{project.title}</h4>
              <p>{project.description}</p>
              <Link to={project.link} className="featured-link">
                Learn More <FaArrowRight />
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Home; 