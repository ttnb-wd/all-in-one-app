import { createContext, useContext, useReducer, useEffect } from 'react';

// Create the CartContext to provide cart state and actions throughout the app
const CartContext = createContext();

/**
 * Cart reducer function that handles all cart state updates
 * @param {Object} state - Current cart state
 * @param {Object} action - Action object with type and payload
 * @returns {Object} New cart state
 */
const cartReducer = (state, action) => {
  switch (action.type) {
    // Add a product to the cart or increment quantity if it already exists
    case 'ADD_TO_CART': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      // If item already exists, increment its quantity
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      
      // If item doesn't exist, add it with quantity 1
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }]
      };
    }
    
    // Remove a product completely from the cart
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id)
      };
    
    // Update the quantity of a specific item in the cart
    case 'UPDATE_QUANTITY': {
      // If quantity is 0 or negative, remove the item from cart
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(item => item.id !== action.payload.id)
        };
      }
      
      // Otherwise, update the quantity
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    }
    
    // Remove all items from the cart
    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      };
    
    // Load cart data from localStorage on app initialization
    case 'LOAD_CART':
      return {
        ...state,
        items: action.payload || []
      };
    
    default:
      return state;
  }
};

// Initial state for the cart
const initialState = {
  items: [] // Array to store cart items with product data and quantities
};

/**
 * CartProvider component that wraps the app and provides cart functionality
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Child components to wrap
 */
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on component mount to persist cart across sessions
  useEffect(() => {
    const savedCart = localStorage.getItem('shopping-cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: parsedCart });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever cart items change for persistence
  useEffect(() => {
    localStorage.setItem('shopping-cart', JSON.stringify(state.items));
  }, [state.items]);

  /**
   * Add a product to the cart or increment quantity if already exists
   * @param {Object} product - Product object to add to cart
   */
  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  /**
   * Remove a product completely from the cart
   * @param {number} productId - ID of the product to remove
   */
  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id: productId } });
  };

  /**
   * Update the quantity of a specific product in the cart
   * @param {number} productId - ID of the product to update
   * @param {number} quantity - New quantity (removes item if <= 0)
   */
  const updateQuantity = (productId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
  };

  /**
   * Remove all items from the cart
   */
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  /**
   * Calculate the total price of all items in the cart
   * @returns {number} Total price in dollars
   */
  const getCartTotal = () => {
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  /**
   * Get the total number of items in the cart (sum of all quantities)
   * @returns {number} Total item count
   */
  const getCartItemsCount = () => {
    return state.items.reduce((count, item) => count + item.quantity, 0);
  };

  /**
   * Find a specific item in the cart by product ID
   * @param {number} productId - ID of the product to find
   * @returns {Object|undefined} Cart item object or undefined if not found
   */
  const getCartItem = (productId) => {
    return state.items.find(item => item.id === productId);
  };

  // Create the context value object with all cart state and methods
  const value = {
    items: state.items,          // Current cart items array
    addToCart,                   // Function to add products to cart
    removeFromCart,              // Function to remove products from cart
    updateQuantity,              // Function to update item quantities
    clearCart,                   // Function to clear entire cart
    getCartTotal,                // Function to calculate total price
    getCartItemsCount,           // Function to get total item count
    getCartItem                  // Function to find specific cart item
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

/**
 * Custom hook to access cart context
 * @returns {Object} Cart context value with state and methods
 * @throws {Error} If used outside of CartProvider
 */
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 