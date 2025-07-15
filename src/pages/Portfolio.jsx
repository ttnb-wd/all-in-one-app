import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { WiDaySunnyOvercast } from 'react-icons/wi';
import { BsCalendarWeek, BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { GiEagleEmblem, GiSpaceship, GiTicTacToe } from 'react-icons/gi';
import { MdDashboard, MdMenu, MdClose } from 'react-icons/md';
import { FaGamepad, FaTools, FaChartBar, FaGithub, FaExternalLinkAlt, FaCalculator } from 'react-icons/fa';
import './Portfolio.css';
import Calculator from '../components/Calculator';

const ItemTypes = {
  PORTFOLIO_ITEM: 'portfolioItem'
};

const PortfolioItem = ({ id, index, moveItem, item, isActive, onShowCalculator }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.PORTFOLIO_ITEM,
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemTypes.PORTFOLIO_ITEM,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const IconComponent = item.icon;
  const isCalculator = item.title === 'Modern Calculator';

  return (
    <motion.div
      ref={(node) => drag(drop(node))}
      className={`portfolio-item ${isDragging ? 'dragging' : ''} ${isActive ? 'active' : ''}`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      whileHover={{ 
        y: -10, 
        scale: 1.03,
        transition: { duration: 0.2 }
      }}
      layout
    >
      <motion.div 
        className="portfolio-item-header"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <IconComponent className="portfolio-icon" />
      </motion.div>
      
      <motion.div 
        className="portfolio-image"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        whileHover={{ scale: 1.05 }}
      >
        <img src={item.image} alt={item.title} />
        <div className="image-overlay">
          <div className="overlay-links">
            {item.demoLink && (
              <motion.a 
                href={item.demoLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="overlay-link"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaExternalLinkAlt />
              </motion.a>
            )}
            {item.codeLink && (
              <motion.a 
                href={item.codeLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="overlay-link"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaGithub />
              </motion.a>
            )}
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="portfolio-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <div className="tech-stack">
          {item.technologies?.map((tech, index) => (
            <motion.span 
              key={tech}
              className="tech-tag"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              {tech}
            </motion.span>
          ))}
        </div>
        <div className="portfolio-links">
          {item.demoLink && (
            isCalculator ? (
              <motion.button
                className="project-link demo-link"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onShowCalculator}
                style={{ cursor: 'pointer' }}
              >
                <FaExternalLinkAlt /> Live Demo
              </motion.button>
            ) : (
              <motion.a
                href={item.demoLink}
                target={item.demoLink.startsWith('http') ? '_blank' : undefined}
                rel={item.demoLink.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="project-link demo-link"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaExternalLinkAlt /> Live Demo
              </motion.a>
            )
          )}
          {item.codeLink && (
            <motion.a 
              href={item.codeLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="project-link code-link"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaGithub /> Source Code
            </motion.a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const Portfolio = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      title: 'Weather App',
      description: 'Real-time weather information with beautiful UI and location-based forecasting featuring interactive maps and detailed analytics.',
      image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      demoLink: '/apps/weather',
      codeLink: 'https://github.com',
      icon: WiDaySunnyOvercast,
      category: 'tools',
      technologies: ['React', 'API Integration', 'CSS3', 'Responsive Design']
    },
    {
      id: 2,
      title: 'Calendar App',
      description: 'Interactive calendar with event management, scheduling capabilities, and seamless user experience with drag-and-drop functionality.',
      image: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      demoLink: '/apps/calendar',
      codeLink: 'https://github.com',
      icon: BsCalendarWeek,
      category: 'tools',
      technologies: ['React', 'Date Management', 'Local Storage', 'Material UI']
    },
    {
      id: 3,
      title: 'Flappy Bird',
      description: 'Classic game recreation using React with smooth animations, collision detection, and high score tracking for engaging gameplay.',
      image: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      demoLink: '/games/flappy-bird',
      codeLink: 'https://github.com',
      icon: GiEagleEmblem,
      category: 'games',
      technologies: ['React', 'Canvas API', 'Game Logic', 'Animations']
    },
    {
      id: 4,
      title: 'Space Invaders',
      description: 'Retro arcade game with modern twist featuring multiple levels, power-ups, and stunning visual effects with nostalgic gameplay.',
      image: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      demoLink: '/games/space-invaders',
      codeLink: 'https://github.com',
      icon: GiSpaceship,
      category: 'games',
      technologies: ['React', 'Canvas API', 'Game Physics', 'Sound Effects']
    },
    {
      id: 5,
      title: 'Tic Tac Toe',
      description: 'Classic game with AI opponent featuring smart algorithms, difficulty levels, and sleek design for competitive gameplay.',
      image: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      demoLink: '/games/tic-tac-toe',
      codeLink: 'https://github.com',
      icon: GiTicTacToe,
      category: 'games',
      technologies: ['React', 'AI Algorithm', 'Game Theory', 'Strategy']
    },
    {
      id: 6,
      title: 'Social Dashboard',
      description: 'Analytics and social media management platform with real-time data visualization, insights, and comprehensive reporting tools.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      demoLink: '/social-dashboard',
      codeLink: 'https://github.com',
      icon: MdDashboard,
      category: 'analytics',
      technologies: ['React', 'Charts.js', 'API Integration', 'Data Visualization']
    },
    {
      id: 7,
      title: 'Modern Calculator',
      description: 'A stylish, animated calculator app built with React. Features a modern glassmorphism UI, smooth button animations, and responsive design.',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      demoLink: '#calculator-demo',
      codeLink: '',
      icon: FaCalculator,
      category: 'tools',
      technologies: ['React', 'CSS3', 'UI Animation', 'Glassmorphism']
    },
  ]);

  const [activeCategory, setActiveCategory] = useState('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCalculatorModal, setShowCalculatorModal] = useState(false);
  const carouselRef = useRef(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const moveItem = (fromIndex, toIndex) => {
    const updatedItems = [...items];
    const [movedItem] = updatedItems.splice(fromIndex, 1);
    updatedItems.splice(toIndex, 0, movedItem);
    setItems(updatedItems);
  };

  const filteredItems = activeCategory === 'all' 
    ? items 
    : items.filter(item => item.category === activeCategory);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === filteredItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? filteredItems.length - 1 : prevIndex - 1
    );
  };

  const categories = [
    { name: 'all', label: 'All Projects', icon: <MdDashboard /> },
    { name: 'games', label: 'Games', icon: <FaGamepad /> },
    { name: 'tools', label: 'Tools', icon: <FaTools /> },
    { name: 'analytics', label: 'Analytics', icon: <FaChartBar /> }
  ];

  return (
    <DndProvider backend={HTML5Backend}>
      <motion.div 
        className="portfolio-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="portfolio-header" variants={itemVariants}>
          <h1>My Projects</h1>
          <p className="portfolio-subtitle">
            A collection of projects showcasing my skills in modern web development
          </p>
        </motion.div>

        <motion.div className="portfolio-filters" variants={itemVariants}>
          {categories.map((category) => (
            <motion.button
              key={category.name}
              className={`filter-btn ${activeCategory === category.name ? 'active' : ''}`}
              onClick={() => {
                setActiveCategory(category.name);
                setCurrentIndex(0);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {category.icon}
              <span>{category.label}</span>
            </motion.button>
          ))}
        </motion.div>

        <motion.div 
          className="portfolio-grid"
          layout
          variants={itemVariants}
        >
          <AnimatePresence mode="wait">
            {filteredItems.map((item, index) => (
              <PortfolioItem
                key={`${item.id}-${activeCategory}`}
                id={item.id}
                index={index}
                moveItem={moveItem}
                item={item}
                isActive={index === currentIndex}
                onShowCalculator={() => setShowCalculatorModal(true)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div 
          className="portfolio-stats"
          variants={itemVariants}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="stats-grid">
            <motion.div 
              className="stat-item"
              whileHover={{ scale: 1.05 }}
            >
              <div className="stat-number">{items.length}</div>
              <div className="stat-label">Total Projects</div>
            </motion.div>
            <motion.div 
              className="stat-item"
              whileHover={{ scale: 1.05 }}
            >
              <div className="stat-number">15+</div>
              <div className="stat-label">Technologies Used</div>
            </motion.div>
            <motion.div 
              className="stat-item"
              whileHover={{ scale: 1.05 }}
            >
              <div className="stat-number">100%</div>
              <div className="stat-label">Open Source</div>
            </motion.div>
          </div>
        </motion.div>
        {/* Modal for calculator demo */}
        {showCalculatorModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(10,25,47,0.85)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
            onClick={() => setShowCalculatorModal(false)}
          >
            <div style={{ position: 'relative', zIndex: 1001 }} onClick={e => e.stopPropagation()}>
              <button
                onClick={() => setShowCalculatorModal(false)}
                style={{
                  position: 'absolute',
                  top: '-2.5rem',
                  right: 0,
                  background: 'none',
                  border: 'none',
                  color: '#fff',
                  fontSize: '2rem',
                  cursor: 'pointer',
                }}
                aria-label="Close calculator demo"
              >
                &times;
              </button>
              <Calculator />
            </div>
          </div>
        )}
      </motion.div>
    </DndProvider>
  );
};

export default Portfolio; 