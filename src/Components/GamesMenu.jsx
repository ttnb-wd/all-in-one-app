import React, { useEffect, useRef } from 'react';
import './GamesMenu.css';

const GamesMenu = ({ setIsMenuOpen }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && 
          !menuRef.current.contains(event.target) && 
          !event.target.closest('.menu-trigger')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsMenuOpen]);

  return (
    <div className="games-menu" ref={menuRef}>
      {/* Existing menu content */}
    </div>
  );
};

export default GamesMenu; 