import { Routes, Route, Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import MyCalendar from './Calendar';
import Weather from './Weather';

function Home() {
  return (
    <div className="container">
      <h1>Welcome to the Home Page</h1>
    </div>
  );
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={`nav-list ${isMenuOpen ? 'active' : ''}`}>
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                isActive ? 'nav-link active' : 'nav-link'
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/calendar" 
              className={({ isActive }) => 
                isActive ? 'nav-link active' : 'nav-link'
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Calendar
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/weather" 
              className={({ isActive }) => 
                isActive ? 'nav-link active' : 'nav-link'
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Weather
            </NavLink>
          </li>
        </ul>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calendar" element={<MyCalendar />} />
          <Route path="/weather" element={<Weather />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;