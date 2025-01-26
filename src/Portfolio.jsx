import { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { WiDaySunnyOvercast } from 'react-icons/wi';
import { BsCalendarWeek } from 'react-icons/bs';
import { GiEagleEmblem, GiSpaceship, GiTicTacToe } from 'react-icons/gi';
import { MdDashboard } from 'react-icons/md';
import './Portfolio.css';

const ItemTypes = {
  PORTFOLIO_ITEM: 'portfolioItem'
};

const PortfolioItem = ({ id, index, moveItem, item }) => {
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
      className={`portfolio-item ${isDragging ? 'dragging' : ''}`}
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
      icon: WiDaySunnyOvercast
    },
    {
      id: 2,
      title: 'Calendar App',
      description: 'Interactive calendar with event management',
      image: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      demoLink: '/calendar',
      codeLink: '#',
      icon: BsCalendarWeek
    },
    {
      id: 3,
      title: 'Flappy Bird',
      description: 'Classic game recreation using React',
      image: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      demoLink: '/flappy-bird',
      codeLink: '#',
      icon: GiEagleEmblem
    },
    {
      id: 4,
      title: 'Space Invaders',
      description: 'Retro arcade game with modern twist',
      image: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      demoLink: '/space-invaders',
      codeLink: '#',
      icon: GiSpaceship
    },
    {
      id: 5,
      title: 'Tic Tac Toe',
      description: 'Classic game with AI opponent',
      image: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      demoLink: '/tic-tac-toe',
      codeLink: '#',
      icon: GiTicTacToe
    },
    {
      id: 6,
      title: 'Social Dashboard',
      description: 'Analytics and social media management',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      demoLink: '/social-dashboard',
      codeLink: '#',
      icon: MdDashboard
    }
  ]);

  const moveItem = (fromIndex, toIndex) => {
    const updatedItems = [...items];
    const [movedItem] = updatedItems.splice(fromIndex, 1);
    updatedItems.splice(toIndex, 0, movedItem);
    setItems(updatedItems);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="portfolio-container">
        <h1>My Portfolio</h1>
        <p className="portfolio-intro">
          Each project showcases different aspects of my skills in web development.
        </p>
        <div className="portfolio-grid">
          {items.map((item, index) => (
            <PortfolioItem
              key={item.id}
              id={item.id}
              index={index}
              moveItem={moveItem}
              item={item}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default Portfolio; 