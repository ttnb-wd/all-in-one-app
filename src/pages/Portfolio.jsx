import { useState, useRef } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { WiDaySunnyOvercast } from 'react-icons/wi';
import { BsCalendarWeek, BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { GiEagleEmblem, GiSpaceship, GiTicTacToe } from 'react-icons/gi';
import { MdDashboard, MdMenu, MdClose } from 'react-icons/md';
import { FaGamepad, FaTools, FaChartBar } from 'react-icons/fa';
import './Portfolio.css';

const ItemTypes = {
  PORTFOLIO_ITEM: 'portfolioItem'
};

const PortfolioItem = ({ id, index, moveItem, item, isActive }) => {
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

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`portfolio-item ${isDragging ? 'dragging' : ''} ${isActive ? 'active' : ''}`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="portfolio-item-header">
        <IconComponent className="portfolio-icon" />
      </div>
      <img src={item.image} alt={item.title} />
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <div className="portfolio-links">
        {item.demoLink && <a href={item.demoLink} target="_blank" rel="noopener noreferrer">Live Demo</a>}
        {item.codeLink && <a href={item.codeLink} target="_blank" rel="noopener noreferrer">Source Code</a>}
      </div>
    </div>
  );
};

const Portfolio = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      title: 'Weather App',
      description: 'Real-time weather information with beautiful UI',
      image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      demoLink: '/weather',
      codeLink: '#',
      icon: WiDaySunnyOvercast,
      category: 'tools'
    },
    {
      id: 2,
      title: 'Calendar App',
      description: 'Interactive calendar with event management',
      image: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      demoLink: '/calendar',
      codeLink: '#',
      icon: BsCalendarWeek,
      category: 'tools'
    },
    {
      id: 3,
      title: 'Flappy Bird',
      description: 'Classic game recreation using React',
      image: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      demoLink: '/flappy-bird',
      codeLink: '#',
      icon: GiEagleEmblem,
      category: 'games'
    },
    {
      id: 4,
      title: 'Space Invaders',
      description: 'Retro arcade game with modern twist',
      image: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      demoLink: '/space-invaders',
      codeLink: '#',
      icon: GiSpaceship,
      category: 'games'
    },
    {
      id: 5,
      title: 'Tic Tac Toe',
      description: 'Classic game with AI opponent',
      image: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      demoLink: '/tic-tac-toe',
      codeLink: '#',
      icon: GiTicTacToe,
      category: 'games'
    },
    {
      id: 6,
      title: 'Social Dashboard',
      description: 'Analytics and social media management',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      demoLink: '/social-dashboard',
      codeLink: '#',
      icon: MdDashboard,
      category: 'analytics'
    }
  ]);

  const [activeCategory, setActiveCategory] = useState('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

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

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="portfolio-container">
        <h1>My Projects</h1>
        <div className="portfolio-filters">
          <button
            className={`filter-btn ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            All
          </button>
          <button
            className={`filter-btn ${activeCategory === 'games' ? 'active' : ''}`}
            onClick={() => setActiveCategory('games')}
          >
            Games
          </button>
          <button
            className={`filter-btn ${activeCategory === 'tools' ? 'active' : ''}`}
            onClick={() => setActiveCategory('tools')}
          >
            Tools
          </button>
          <button
            className={`filter-btn ${activeCategory === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveCategory('analytics')}
          >
            Analytics
          </button>
        </div>
        <div className="portfolio-carousel" ref={carouselRef}>
          <button className="carousel-btn prev" onClick={prevSlide}>
            <BsChevronLeft />
          </button>
          <div className="portfolio-cards">
            {filteredItems.map((item, index) => (
              <PortfolioItem
                key={item.id}
                id={item.id}
                index={index}
                moveItem={moveItem}
                item={item}
                isActive={index === currentIndex}
              />
            ))}
          </div>
          <button className="carousel-btn next" onClick={nextSlide}>
            <BsChevronRight />
          </button>
        </div>
        <div className="carousel-dots">
          {filteredItems.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default Portfolio; 