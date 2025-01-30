import { Routes, Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import TicTacToe from './TicTacToe';
import SpaceInvaders from './SpaceInvaders';
import FlappyBird from './FlappyBird';
import Calendar from './Calendar';
import Weather from './Weather';
import { ThemeProvider } from './context/ThemeContext';
import './App.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="portfolio" element={<Portfolio />} />
      <Route path="contact" element={<Contact />} />
      <Route path="games">
        <Route path="tic-tac-toe" element={<TicTacToe />} />
        <Route path="space-invaders" element={<SpaceInvaders />} />
        <Route path="flappy-bird" element={<FlappyBird />} />
      </Route>
      <Route path="apps">
        <Route path="calendar" element={<Calendar />} />
        <Route path="weather" element={<Weather />} />
      </Route>
    </Route>
  ),
  {
    future: {
      v7_startTransition: true,
    },
  }
);
function Root() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;