import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import CartSummary from '../components/CartSummary';
import './Cart.css';

/**
 * Cart component displays the shopping cart page with cart items and summary
 * Shows empty state when no items are in cart, otherwise displays items and checkout summary
 */
const Cart = () => {
  // Get cart data from context
  const { items, getCartItemsCount } = useCart();

  // Render empty cart state if no items
  if (items.length === 0) {
    return (
      <div className="cart-page">
        {/* Page header */}
        <div className="cart-header">
          <h1>Shopping Cart</h1>
        </div>
        
        {/* Empty state with call-to-action */}
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any items to your cart yet.</p>
          <Link to="/shop" className="continue-shopping-btn">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  // Render cart with items
  return (
    <div className="cart-page">
      {/* Page header with item count */}
      <div className="cart-header">
        <h1>Shopping Cart</h1>
        <p>{getCartItemsCount()} {getCartItemsCount() === 1 ? 'item' : 'items'} in your cart</p>
      </div>

      {/* Main cart content with items and summary */}
      <div className="cart-content">
        {/* Left section: Cart items list */}
        <div className="cart-items-section">
          {/* Items section header with continue shopping link */}
          <div className="cart-items-header">
            <h2>Items in your cart</h2>
            <Link to="/shop" className="continue-shopping-link">
              Continue Shopping
            </Link>
          </div>
          
          {/* List of all cart items */}
          <div className="cart-items-list">
            {items.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* Right section: Order summary and checkout */}
        <div className="cart-summary-section">
          <CartSummary />
        </div>
      </div>
    </div>
  );
};

export default Cart; 