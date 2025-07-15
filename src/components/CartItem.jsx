import { useCart } from '../context/CartContext';
import './CartItem.css';

/**
 * CartItem component displays an individual item in the shopping cart
 * Includes product info, quantity controls, and remove functionality
 * @param {Object} props - Component props
 * @param {Object} props.item - Cart item object with product data and quantity
 */
const CartItem = ({ item }) => {
  // Get cart management functions from context
  const { updateQuantity, removeFromCart } = useCart();

  /**
   * Handle quantity changes for the cart item
   * Removes item if quantity becomes 0 or negative
   * @param {number} newQuantity - New quantity value
   */
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(item.id);    // Remove item if quantity is 0 or negative
    } else {
      updateQuantity(item.id, newQuantity);  // Update to new quantity
    }
  };

  /**
   * Format price with dollar sign and thousand separators
   * @param {number} price - Price to format
   * @returns {string} Formatted price string
   */
  const formatPrice = (price) => {
    return `$${price.toLocaleString()}`;
  };

  // Calculate total price for this item (price × quantity)
  const itemTotal = item.price * item.quantity;

  return (
    <div className="cart-item">
      {/* Product image */}
      <div className="cart-item-image">
        <img src={item.image} alt={item.name} />
      </div>
      
      {/* Product information section */}
      <div className="cart-item-details">
        <h3 className="cart-item-name">{item.name}</h3>
        <p className="cart-item-brand">{item.brand}</p>
        <p className="cart-item-price">{formatPrice(item.price)} each</p>
      </div>

      {/* Quantity controls and actions section */}
      <div className="cart-item-controls">
        {/* Quantity adjustment buttons */}
        <div className="quantity-controls">
          <button 
            className="quantity-btn"
            onClick={() => handleQuantityChange(item.quantity - 1)}
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span className="quantity-display">{item.quantity}</span>
          <button 
            className="quantity-btn"
            onClick={() => handleQuantityChange(item.quantity + 1)}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        
        {/* Total price for this line item */}
        <div className="cart-item-total">
          {formatPrice(itemTotal)}
        </div>
        
        {/* Remove item button */}
        <button 
          className="remove-item-btn"
          onClick={() => removeFromCart(item.id)}
          aria-label="Remove item from cart"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default CartItem; 