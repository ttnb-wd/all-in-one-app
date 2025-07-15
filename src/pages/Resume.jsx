import React from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaBriefcase, FaGraduationCap, FaCode, FaCalendar, FaMapMarkerAlt, FaAward } from 'react-icons/fa';
import './Resume.css';

const Resume = () => {
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
    hidden: { y: 30, opacity: 0 },
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

  const skillVariants = {
    hidden: { width: 0 },
    visible: (skill) => ({
      width: `${skill.level}%`,
      transition: {
        duration: 1.2,
        ease: "easeOut",
        delay: 0.5
      }
    })
  };

  const skills = [
    { name: 'React.js', level: 85, color: '#61DAFB' },
    { name: 'JavaScript', level: 80, color: '#F7DF1E' },
    { name: 'HTML/CSS', level: 92, color: '#E34F26' },
    { name: 'Git/GitHub', level: 67, color: '#F05032' },
    { name: 'Responsive Design', level: 70, color: '#64ffda' },
    { name: 'REST APIs', level: 65, color: '#FF6B6B' }
  ];

  const experiences = [
    
    {
      title: 'JuniorFrontend Developer',
      company: 'Eiga',
      location: 'Myitkyina, Myanmar',
      period: '2024',
      description: [
        'Developed and animated some portfolio websites using HTML/CSS, React and JavaScript',
        'Implemented responsive designs with CSS Grid, Flexbox, and modern CSS techniques',
        'Integrated third-party APIs and services to enhance application functionality',
        'Reduced page load times by 60% through image optimization and code splitting',
        'Built interactive web components using HTML5, CSS3, and JavaScript ES6+',
        'Participated in agile development process and daily stand-up meetings',
        'Assisted in debugging and testing web applications across multiple browsers',
        'Collaborated with backend developers to integrate frontend with RESTful APIs'
      ]
    }];
  
    const education = [
    {
      degree: 'History',
      location: 'Myitkyina, Myanmar',
      period: '2016 - 2020',
      achievements: []
    },
    
  ];

  const certifications = [
    {
      name: 'working',
      date: '2022',
      icon: <FaAward />
    },
    {
      name: 'on',
      date: '2023',
      icon: <FaAward />
    },
    {
      name: 'it',
      date: '2024',
      icon: <FaAward />
    }
  ];

  const handleDownloadResume = () => {
    // In a real application, this would download an actual PDF file
    const link = document.createElement('a');
    link.href = '/resume.pdf'; // This would be the path to your actual resume file
    link.download = 'Alex_Johnson_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div 
      className="resume-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="resume-header" variants={itemVariants}>
        <h1>Resume</h1>
        <motion.button 
          className="download-btn"
          onClick={handleDownloadResume}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaDownload /> Download PDF
        </motion.button>
      </motion.div>

      <motion.div className="resume-content" variants={itemVariants}>
        {/* Skills Section */}
        <motion.section className="resume-section skills-section" variants={itemVariants}>
          <h2><FaCode /> Technical Skills</h2>
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <motion.div 
                key={skill.name} 
                className="skill-item"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="skill-info">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-percentage">{skill.level}%</span>
                </div>
                <div className="skill-bar">
                  <motion.div 
                    className="skill-progress"
                    custom={skill}
                    variants={skillVariants}
                    style={{ backgroundColor: skill.color }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Experience Section */}
        <motion.section className="resume-section experience-section" variants={itemVariants}>
          <h2><FaBriefcase /> Work Experience</h2>
          <div className="timeline">
            {experiences.map((exp, index) => (
              <motion.div 
                key={index} 
                className="timeline-item"
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h3>{exp.title}</h3>
                  <h4>{exp.company}</h4>
                  <div className="timeline-meta">
                    <span className="period"><FaCalendar /> {exp.period}</span>
                    <span className="location"><FaMapMarkerAlt /> {exp.location}</span>
                  </div>
                  <ul className="experience-list">
                    {exp.description.map((item, idx) => (
                      <motion.li 
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: (index * 0.2) + (idx * 0.1) + 0.3 }}
                        viewport={{ once: true }}
                      >
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Education Section */}
        <motion.section className="resume-section education-section" variants={itemVariants}>
          <h2><FaGraduationCap /> Education</h2>
          <div className="education-grid">
            {education.map((edu, index) => (
              <motion.div 
                key={index} 
                className="education-item"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.3 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03 }}
              >
                <h3>{edu.degree}</h3>
                <h4>{edu.school}</h4>
                <div className="education-meta">
                  <span className="period"><FaCalendar /> {edu.period}</span>
                  <span className="location"><FaMapMarkerAlt /> {edu.location}</span>
                  <span className="gpa">GPA: {edu.gpa}</span>
                </div>
                <ul className="achievements-list">
                  {(edu.achievements || []).map((achievement, idx) => (
                    <li key={idx}>{achievement}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Certifications Section */}
        <motion.section className="resume-section certifications-section" variants={itemVariants}>
          <h2><FaAward /> Certifications</h2>
          <div className="certifications-grid">
            {certifications.map((cert, index) => (
              <motion.div 
                key={index} 
                className="certification-item"
                initial={{ scale: 0, rotate: -10 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <div className="cert-icon">{cert.icon}</div>
                <h4>{cert.name}</h4>
                <p>{cert.issuer}</p>
                <span className="cert-date">{cert.date}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </motion.div>
    </motion.div>
  );
};

export default Resume; 