import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

/**
 * ProductCard component displays a product in a card format with image, details, and add to cart functionality
 * Used in product listings and search results
 * @param {Object} props - Component props
 * @param {Object} props.product - Product object containing all product information
 */
const ProductCard = ({ product }) => {
  // Get cart functions and check if this product is already in cart
  const { addToCart, getCartItem } = useCart();
  const cartItem = getCartItem(product.id);

  /**
   * Handle adding product to cart
   * Prevents event bubbling to avoid navigation when clicking add to cart button
   * @param {Event} e - Click event
   */
  const handleAddToCart = (e) => {
    e.preventDefault();    // Prevent default link behavior
    e.stopPropagation();   // Stop event from bubbling to parent Link
    addToCart(product);
  };

  /**
   * Format price with dollar sign and thousand separators
   * @param {number} price - Price to format
   * @returns {string} Formatted price string
   */
  const formatPrice = (price) => {
    return `$${price.toLocaleString()}`;
  };

  /**
   * Render star rating display
   * @param {number} rating - Rating value (0-5)
   * @returns {Array} Array of star span elements
   */
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span 
        key={index} 
        className={`star ${index < Math.floor(rating) ? 'filled' : ''}`}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="product-card">
      {/* Main product link that navigates to product detail page */}
      <Link to={`/shop/product/${product.id}`} className="product-card-link">
        {/* Product image section with overlays for stock status and discounts */}
        <div className="product-card-image">
          <img src={product.image} alt={product.name} />
          {/* Show out of stock overlay if product is not available */}
          {!product.inStock && <div className="out-of-stock-overlay">Out of Stock</div>}
          {/* Show discount badge if product has a sale price */}
          {product.originalPrice > product.price && (
            <div className="discount-badge">
              Save ${product.originalPrice - product.price}
            </div>
          )}
        </div>
        
        {/* Product information section */}
        <div className="product-card-content">
          <div className="product-brand">{product.brand}</div>
          <h3 className="product-name">{product.name}</h3>
          <p className="product-description">{product.description}</p>
          
          {/* Star rating display */}
          <div className="product-rating">
            <div className="stars">
              {renderStars(product.rating)}
            </div>
            <span className="rating-text">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>
          
          {/* Pricing information with original and sale prices */}
          <div className="product-pricing">
            <span className="current-price">{formatPrice(product.price)}</span>
            {product.originalPrice > product.price && (
              <span className="original-price">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
        </div>
      </Link>
      
      {/* Add to cart button section (separate from link to prevent navigation) */}
      <div className="product-card-actions">
        <button 
          className={`add-to-cart-btn ${!product.inStock ? 'disabled' : ''} ${cartItem ? 'in-cart' : ''}`}
          onClick={handleAddToCart}
          disabled={!product.inStock}
        >
          {/* Dynamic button text based on stock status and cart state */}
          {!product.inStock ? 'Out of Stock' : cartItem ? `In Cart (${cartItem.quantity})` : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard; 