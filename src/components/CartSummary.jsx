import { useCart } from '../context/CartContext';
import './CartSummary.css';

/**
 * CartSummary component displays order summary with pricing breakdown and checkout actions
 * Includes subtotal, shipping, tax calculations and checkout/clear cart functionality
 */
const CartSummary = () => {
  // Get cart data and functions from context
  const { items, getCartTotal, getCartItemsCount, clearCart } = useCart();

  /**
   * Format price with dollar sign and thousand separators
   * @param {number} price - Price to format
   * @returns {string} Formatted price string
   */
  const formatPrice = (price) => {
    return `$${price.toLocaleString()}`;
  };

  // Calculate pricing breakdown
  const subtotal = getCartTotal();                    // Sum of all item prices × quantities
  const shipping = subtotal > 1000 ? 0 : 49;         // Free shipping over $1000, otherwise $49
  const tax = subtotal * 0.08;                       // 8% sales tax
  const total = subtotal + shipping + tax;           // Final total amount

  /**
   * Handle checkout process
   * In a real app, this would integrate with payment processing
   */
  const handleCheckout = () => {
    alert('Checkout functionality would be implemented here!');
  };

  /**
   * Handle clearing the entire cart with confirmation
   * Prompts user to confirm before clearing to prevent accidental deletion
   */
  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCart();
    }
  };

  // Don't render if cart is empty
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="cart-summary">
      {/* Summary header */}
      <h3 className="cart-summary-title">Order Summary</h3>
      
      {/* Pricing breakdown section */}
      <div className="cart-summary-details">
        {/* Items subtotal */}
        <div className="summary-row">
          <span>Items ({getCartItemsCount()})</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        
        {/* Shipping cost with free shipping highlight */}
        <div className="summary-row">
          <span>Shipping</span>
          <span className={shipping === 0 ? 'free-shipping' : ''}>
            {shipping === 0 ? 'FREE' : formatPrice(shipping)}
          </span>
        </div>
        
        {/* Tax calculation */}
        <div className="summary-row">
          <span>Tax</span>
          <span>{formatPrice(tax)}</span>
        </div>
        
        {/* Visual separator before total */}
        <div className="summary-divider"></div>
        
        {/* Final total amount */}
        <div className="summary-row total-row">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>

      {/* Free shipping incentive notice */}
      {subtotal < 1000 && (
        <div className="shipping-notice">
          Add {formatPrice(1000 - subtotal)} more for FREE shipping!
        </div>
      )}

      {/* Action buttons section */}
      <div className="cart-summary-actions">
        {/* Primary checkout button */}
        <button className="checkout-btn" onClick={handleCheckout}>
          Proceed to Checkout
        </button>
        
        {/* Secondary clear cart button */}
        <button className="clear-cart-btn" onClick={handleClearCart}>
          Clear Cart
        </button>
      </div>

      {/* Security assurance for customer confidence */}
      <div className="security-notice">
        <span className="security-icon">🔒</span>
        <span>Secure checkout with 256-bit SSL encryption</span>
      </div>
    </div>
  );
};

export default CartSummary; 