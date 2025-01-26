import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { AiOutlineHome, AiOutlineCalendar } from 'react-icons/ai';
import { TiWeatherPartlySunny } from 'react-icons/ti';
import { GiGamepad, GiSpaceship } from 'react-icons/gi';
import { FaGamepad, FaChartLine } from 'react-icons/fa';
import './App.css';
import MyCalendar from './Calendar';
import Weather from './Weather';
import FlappyBird from './FlappyBird';
import SpaceInvaders from './SpaceInvaders';
import TicTacToe from './TicTacToe';
import SocialDashboard from './SocialDashboard';

function Home() {
  return (
    <div className="container">
      <h1>Hello MotherFucker</h1>
    </div>
  );
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isGamesOpen, setIsGamesOpen] = useState(false);
  const location = useLocation();
  const gamesDropdownRef = useRef(null);
  const navRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (gamesDropdownRef.current && 
          !gamesDropdownRef.current.contains(event.target) && 
          !event.target.closest('.menu-trigger')) {
        setIsGamesOpen(false);
      }
      
      if (navRef.current && 
          !navRef.current.contains(event.target) && 
          !event.target.closest('.hamburger')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isGamesOpen, isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleGames = () => {
    setIsGamesOpen(!isGamesOpen);
  };

  return (
    <div className="app">
      <nav className="navbar" ref={navRef}>
        <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={`nav-list ${isMenuOpen ? 'active' : ''}`}>
          <li>
            <Link 
              to="/" 
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <AiOutlineHome />
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/calendar" 
              className={`nav-link ${location.pathname === '/calendar' ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <AiOutlineCalendar />
              Calendar
            </Link>
          </li>
          <li>
            <Link 
              to="/weather" 
              className={`nav-link ${location.pathname === '/weather' ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <TiWeatherPartlySunny />
              Weather
            </Link>
          </li>
          <li>
            <Link 
              to="/social-dashboard" 
              className={`nav-link ${location.pathname === '/social-dashboard' ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <FaChartLine />
              Social Dashboard
            </Link>
          </li>
          <li className="games-dropdown" ref={gamesDropdownRef}>
            <div 
              className={`nav-link menu-trigger ${['/flappy-bird', '/space-invaders', '/tic-tac-toe'].includes(location.pathname) ? 'active' : ''}`}
              onClick={toggleGames}
            >
              <GiGamepad />
              Games
              <span className={`arrow ${isGamesOpen ? 'up' : 'down'}`}>▼</span>
            </div>
            <ul className={`submenu ${isGamesOpen ? 'active' : ''}`}>
              <li>
                <Link 
                  to="/flappy-bird" 
                  className={`nav-link ${location.pathname === '/flappy-bird' ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <GiGamepad />
                  Flappy Bird
                </Link>
              </li>
              <li>
                <Link 
                  to="/space-invaders" 
                  className={`nav-link ${location.pathname === '/space-invaders' ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <GiSpaceship />
                  Space Invaders
                </Link>
              </li>
              <li>
                <Link 
                  to="/tic-tac-toe" 
                  className={`nav-link ${location.pathname === '/tic-tac-toe' ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaGamepad />
                  Tic Tac Toe
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calendar" element={<MyCalendar />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/social-dashboard" element={<SocialDashboard />} />
          <Route path="/flappy-bird" element={<FlappyBird />} />
          <Route path="/space-invaders" element={<SpaceInvaders />} />
          <Route path="/tic-tac-toe" element={<TicTacToe />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;