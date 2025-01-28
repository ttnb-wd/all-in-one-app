import { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { FaHome, FaUser, FaBriefcase, FaEnvelope, FaGamepad, FaTools } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [gamesOpen, setGamesOpen] = useState(false);
  const [appsOpen, setAppsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setGamesOpen(false);
        setAppsOpen(false);
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleGames = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setGamesOpen(!gamesOpen);
    setAppsOpen(false);
  };

  const toggleApps = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setAppsOpen(!appsOpen);
    setGamesOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeDropdowns = () => {
    setGamesOpen(false);
    setAppsOpen(false);
    setIsMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isMenuOpen ? 'open' : ''} ${isScrolled ? 'scrolled' : ''}`} ref={navRef}>
      <div className="nav-brand">
        <Link to="/">Portfolio</Link>
      </div>
      <button className="nav-toggle" onClick={toggleMenu}>
        <span></span>
      </button>
      <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
        <Link to="/" className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
          <span className="nav-text">Home</span>
        </Link>
        <Link to="/about" className={`nav-item ${location.pathname === '/about' ? 'active' : ''}`}>
          <span className="nav-text">About</span>
        </Link>
        <Link to="/portfolio" className={`nav-item ${location.pathname === '/portfolio' ? 'active' : ''}`}>
          <span className="nav-text">Portfolio</span>
        </Link>
        <Link to="/contact" className={`nav-item ${location.pathname === '/contact' ? 'active' : ''}`}>
          <span className="nav-text">Contact</span>
        </Link>
        <div className="games-dropdown">
          <button className="nav-item" onClick={toggleGames}>
            <FaGamepad /> Games
            <span className={`arrow ${gamesOpen ? 'up' : ''}`}>▼</span>
          </button>
          <ul className={`submenu ${gamesOpen ? 'active' : ''}`}>
            <li>
              <NavLink to="/games/tic-tac-toe" onClick={closeDropdowns}>
                Tic Tac Toe
              </NavLink>
            </li>
            <li>
              <NavLink to="/games/space-invaders" onClick={closeDropdowns}>
                Space Invaders
              </NavLink>
            </li>
            <li>
              <NavLink to="/games/flappy-bird" onClick={closeDropdowns}>
                Flappy Bird
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="games-dropdown">
          <button className="nav-item" onClick={toggleApps}>
            <FaTools /> Apps
            <span className={`arrow ${appsOpen ? 'up' : ''}`}>▼</span>
          </button>
          <ul className={`submenu ${appsOpen ? 'active' : ''}`}>
            <li>
              <NavLink to="/apps/calendar" onClick={closeDropdowns}>
                Calendar
              </NavLink>
            </li>
            <li>
              <NavLink to="/apps/weather" onClick={closeDropdowns}>
                Weather
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      {(isMenuOpen || gamesOpen || appsOpen) && (
        <div className="navbar-overlay" onClick={closeDropdowns} />
      )}
    </nav>
  );
};

export default Navbar; 