// React Router imports for navigation
import { Routes, Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Outlet } from 'react-router-dom';

// Layout components
import Navbar from './components/Navbar';

// Page components
import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import Resume from './pages/Resume';

// Blog components
import BlogList from './components/BlogList';
import BlogPost from './components/BlogPost';

// Shop/E-commerce components
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';

// Form components
import SignupForm from './components/SignupForm';

// Game components
import TicTacToe from './TicTacToe';
import SpaceInvaders from './SpaceInvaders';
import FlappyBird from './FlappyBird';

// Utility app components
import Calendar from './Calendar';
import Weather from './Weather';

// Context providers for global state management
import { ThemeProvider } from './context/ThemeContext';  // Theme switching (dark/light mode)
import { CartProvider } from './context/CartContext';    // Shopping cart state management

import './App.css';

/**
 * React Router configuration with all application routes
 * Uses v7 future flags for forward compatibility
 */
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      {/* Main pages */}
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="portfolio" element={<Portfolio />} />
      <Route path="contact" element={<Contact />} />
      <Route path="resume" element={<Resume />} />
      <Route path="signup" element={<SignupForm />} />

      {/* Blog section with nested routes */}
      <Route path="blog">
        <Route index element={<BlogList />} />           {/* /blog */}
        <Route path=":slug" element={<BlogPost />} />    {/* /blog/post-slug */}
      </Route>

      {/* E-commerce shop section */}
      <Route path="shop">
        <Route index element={<ProductList />} />              {/* /shop */}
        <Route path="product/:id" element={<ProductDetail />} /> {/* /shop/product/123 */}
      </Route>
      <Route path="cart" element={<Cart />} />                   {/* /cart */}

      {/* Games section with multiple game routes */}
      <Route path="games">
        <Route path="tic-tac-toe" element={<TicTacToe />} />      {/* /games/tic-tac-toe */}
        <Route path="space-invaders" element={<SpaceInvaders />} /> {/* /games/space-invaders */}
        <Route path="flappy-bird" element={<FlappyBird />} />     {/* /games/flappy-bird */}
      </Route>

      {/* Utility apps section */}
      <Route path="apps">
        <Route path="calendar" element={<Calendar />} />         {/* /apps/calendar */}
        <Route path="weather" element={<Weather />} />           {/* /apps/weather */}
      </Route>
    </Route>
  ),
  {
    // React Router v7 future flags for forward compatibility
    future: {
      v7_startTransition: true,              // Wrap state updates in React.startTransition
      v7_relativeSplatPath: true,            // Change relative path resolution for splat routes
      v7_fetcherPersist: true,               // Change fetcher persistence behavior
      v7_normalizeFormMethod: true,          // Normalize form methods to uppercase
      v7_partialHydration: true,             // Enable partial hydration support
      v7_skipActionErrorRevalidation: true,  // Skip revalidation when actions throw
    },
  }
);
/**
 * Root layout component that wraps all pages
 * Provides global context providers and consistent layout structure
 */
function Root() {
  return (
    <ThemeProvider>      {/* Provides theme switching functionality */}
      <CartProvider>     {/* Provides shopping cart state management */}
        <div className="app">
          <Navbar />       {/* Global navigation bar */}
          <main className="main-content">
            <Outlet />     {/* Renders the current route's component */}
          </main>
        </div>
      </CartProvider>
    </ThemeProvider>
  );
}

/**
 * Main App component that provides the router to the entire application
 */
function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;