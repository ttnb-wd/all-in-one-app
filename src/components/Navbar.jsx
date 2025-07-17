import { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { FaHome, FaUser, FaBriefcase, FaEnvelope, FaGamepad, FaTools, FaBlog, FaShoppingCart, FaStore, FaFileAlt } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const [gamesOpen, setGamesOpen] = useState(false);
  const [appsOpen, setAppsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef(null);
  const location = useLocation();
  const { getCartItemsCount } = useCart();

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
    <nav className={`navbar ${isMenuOpen ? 'open' : ''}`} ref={navRef}>
      <div className="nav-brand">
        <Link to="/" onClick={closeDropdowns}>Portfolio</Link>
      </div>
      <button className="nav-toggle" onClick={toggleMenu}>
        <span></span>
      </button>
      <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
        <Link to="/" className={`nav-item ${location.pathname === '/' ? 'active' : ''}`} onClick={closeDropdowns}>
          <span className="nav-text">Home</span>
        </Link>
        <Link to="/about" className={`nav-item ${location.pathname === '/about' ? 'active' : ''}`} onClick={closeDropdowns}>
          <span className="nav-text">About</span>
        </Link>
        <Link to="/portfolio" className={`nav-item ${location.pathname === '/portfolio' ? 'active' : ''}`} onClick={closeDropdowns}>
          <span className="nav-text">Portfolio</span>
        </Link>
        <Link to="/resume" className={`nav-item ${location.pathname === '/resume' ? 'active' : ''}`} onClick={closeDropdowns}>
          <FaFileAlt />
          <span className="nav-text">Resume</span>
        </Link>
        <Link to="/blog" className={`nav-item ${location.pathname.startsWith('/blog') ? 'active' : ''}`} onClick={closeDropdowns}>
          <span className="nav-text">Blog</span>
        </Link>
        <Link to="/contact" className={`nav-item ${location.pathname === '/contact' ? 'active' : ''}`} onClick={closeDropdowns}>
          <span className="nav-text">Contact</span>
        </Link>
        <Link to="/shop" className={`nav-item ${location.pathname.startsWith('/shop') ? 'active' : ''}`} onClick={closeDropdowns}>
          <FaStore />
          <span className="nav-text">Shop</span>
        </Link>
        <Link to="/signup" className={`nav-item ${location.pathname === '/signup' ? 'active' : ''}`} onClick={closeDropdowns}>
          <span className="nav-text">Sign Up</span>
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
        <Link to="/cart" className={`nav-item cart-link ${location.pathname === '/cart' ? 'active' : ''}`} onClick={closeDropdowns}>
          <FaShoppingCart />
          <span className="nav-text">Cart</span>
          {getCartItemsCount() > 0 && (
            <span className="cart-count">{getCartItemsCount()}</span>
          )}
        </Link>
      </div>
      {(isMenuOpen || gamesOpen || appsOpen) && (
        <div className="navbar-overlay" onClick={closeDropdowns} />
      )}
    </nav>
  );
};

export default Navbar; 