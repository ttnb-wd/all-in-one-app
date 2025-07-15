import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { getProductById } from '../data/products';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';

/**
 * ProductDetail component displays detailed product information page
 * Shows product images, specifications, features, and purchase options
 * Includes tabbed interface for different product information sections
 */
const ProductDetail = () => {
  // Get product ID from URL parameters and navigation function
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Get cart functions and check if product is already in cart
  const { addToCart, getCartItem, updateQuantity } = useCart();
  
  // State for managing active information tab
  const [activeTab, setActiveTab] = useState('description');
  
  // Fetch product data and cart status
  const product = getProductById(id);
  const cartItem = getCartItem(parseInt(id));

  // Handle product not found case
  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product not found</h2>
        <button onClick={() => navigate('/shop')} className="back-btn">
          Back to Shop
        </button>
      </div>
    );
  }

  /**
   * Handle adding product to cart
   * Used when product is not yet in cart
   */
  const handleAddToCart = () => {
    addToCart(product);
  };

  /**
   * Handle updating quantity of product already in cart
   * @param {number} newQuantity - New quantity value
   */
  const handleUpdateQuantity = (newQuantity) => {
    updateQuantity(product.id, newQuantity);
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

  // Calculate savings information for display
  const savings = product.originalPrice - product.price;
  const savingsPercentage = Math.round((savings / product.originalPrice) * 100);

  return (
    <div className="product-detail-page">
      {/* Back navigation button */}
      <button onClick={() => navigate('/shop')} className="back-btn">
        ← Back to Shop
      </button>

      {/* Main product detail container */}
      <div className="product-detail-container">
        {/* Left side: Product image section */}
        <div className="product-image-section">
          <div className="product-main-image">
            <img src={product.image} alt={product.name} />
            {/* Stock status overlay */}
            {!product.inStock && <div className="out-of-stock-overlay">Out of Stock</div>}
            {/* Discount badge for sale items */}
            {savings > 0 && (
              <div className="discount-badge">
                Save {savingsPercentage}%
              </div>
            )}
          </div>
        </div>

        {/* Right side: Product information section */}
        <div className="product-info-section">
          {/* Brand and product name */}
          <div className="product-brand">{product.brand}</div>
          <h1 className="product-title">{product.name}</h1>
          
          {/* Customer rating display */}
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
            {savings > 0 && (
              <>
                <span className="original-price">{formatPrice(product.originalPrice)}</span>
                <span className="savings">Save {formatPrice(savings)}</span>
              </>
            )}
          </div>

          {/* Stock availability indicator */}
          <div className="product-stock">
            {product.inStock ? (
              <span className="in-stock">✓ In Stock</span>
            ) : (
              <span className="out-of-stock">✗ Out of Stock</span>
            )}
          </div>

          {/* Add to cart or quantity control section */}
          <div className="add-to-cart-section">
            {cartItem ? (
              /* Show quantity controls if item is already in cart */
              <div className="quantity-controls">
                <button 
                  onClick={() => handleUpdateQuantity(cartItem.quantity - 1)}
                  className="quantity-btn"
                >
                  -
                </button>
                <span className="quantity-display">{cartItem.quantity}</span>
                <button 
                  onClick={() => handleUpdateQuantity(cartItem.quantity + 1)}
                  className="quantity-btn"
                >
                  +
                </button>
              </div>
            ) : (
              /* Show add to cart button if item not in cart */
              <button 
                className={`add-to-cart-btn ${!product.inStock ? 'disabled' : ''}`}
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                {!product.inStock ? 'Out of Stock' : 'Add to Cart'}
              </button>
            )}
          </div>

          {/* Tabbed product information section */}
          <div className="product-tabs">
            {/* Tab navigation headers */}
            <div className="tab-headers">
              <button 
                className={`tab-header ${activeTab === 'description' ? 'active' : ''}`}
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>
              <button 
                className={`tab-header ${activeTab === 'features' ? 'active' : ''}`}
                onClick={() => setActiveTab('features')}
              >
                Features
              </button>
              <button 
                className={`tab-header ${activeTab === 'specifications' ? 'active' : ''}`}
                onClick={() => setActiveTab('specifications')}
              >
                Specifications
              </button>
            </div>

            {/* Tab content that changes based on active tab */}
            <div className="tab-content">
              {/* Product description tab */}
              {activeTab === 'description' && (
                <div className="description-content">
                  <p>{product.description}</p>
                </div>
              )}

              {/* Product features list tab */}
              {activeTab === 'features' && (
                <div className="features-content">
                  <ul>
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Technical specifications tab */}
              {activeTab === 'specifications' && (
                <div className="specifications-content">
                  <dl>
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="spec-item">
                        <dt>{key.charAt(0).toUpperCase() + key.slice(1)}:</dt>
                        <dd>{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 