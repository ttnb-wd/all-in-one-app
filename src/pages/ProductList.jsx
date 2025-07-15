import { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import { products, categories, brands, getProductsByCategory, getProductsByBrand } from '../data/products';
import './ProductList.css';

/**
 * ProductList component displays the main product catalog page with filtering, searching, and sorting
 * Features include category/brand filters, search functionality, and multiple sort options
 */
const ProductList = () => {
  // State for all filter and sort options
  const [selectedCategory, setSelectedCategory] = useState('All Products'); // Current category filter
  const [selectedBrand, setSelectedBrand] = useState('All Brands');         // Current brand filter
  const [sortBy, setSortBy] = useState('name');                            // Current sort option
  const [searchTerm, setSearchTerm] = useState('');                        // Current search query

  /**
   * Memoized computation of filtered and sorted products
   * Recalculates only when dependencies change for performance optimization
   */
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Apply category filter
    if (selectedCategory !== 'All Products') {
      filtered = getProductsByCategory(selectedCategory);
    }

    // Apply brand filter on top of category filter
    if (selectedBrand !== 'All Brands') {
      filtered = filtered.filter(product => product.brand === selectedBrand);
    }

    // Apply search filter - searches in name, description, and brand
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting based on selected sort option
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;              // Ascending price order
        case 'price-high':
          return b.price - a.price;              // Descending price order
        case 'rating':
          return b.rating - a.rating;            // Highest rated first
        case 'name':
        default:
          return a.name.localeCompare(b.name);   // Alphabetical order
      }
    });

    return filtered;
  }, [selectedCategory, selectedBrand, sortBy, searchTerm]); // Dependencies for memoization

  /**
   * Reset all filters and search to their default values
   * Useful when user wants to see all products or when no results are found
   */
  const handleClearFilters = () => {
    setSelectedCategory('All Products');
    setSelectedBrand('All Brands');
    setSortBy('name');
    setSearchTerm('');
  };

  return (
    <div className="product-list-page">
      {/* Page header with title and description */}
      <div className="product-list-header">
        <h1>Our Products</h1>
        <p>Discover our amazing collection of tech products</p>
      </div>

      {/* Filter and search controls section */}
      <div className="product-filters">
        {/* Search input for text-based filtering */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Filter and sort controls */}
        <div className="filter-controls">
          {/* Category filter dropdown */}
          <div className="filter-group">
            <label htmlFor="category-select">Category:</label>
            <select
              id="category-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-select"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Brand filter dropdown */}
          <div className="filter-group">
            <label htmlFor="brand-select">Brand:</label>
            <select
              id="brand-select"
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="filter-select"
            >
              {brands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>

          {/* Sort options dropdown */}
          <div className="filter-group">
            <label htmlFor="sort-select">Sort by:</label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="name">Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
            </select>
          </div>

          {/* Clear all filters button */}
          <button onClick={handleClearFilters} className="clear-filters-btn">
            Clear Filters
          </button>
        </div>
      </div>

      {/* Results count display */}
      <div className="products-info">
        <p>{filteredAndSortedProducts.length} products found</p>
      </div>

      {/* Product grid displaying filtered and sorted results */}
      <div className="products-grid">
        {filteredAndSortedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Empty state when no products match the current filters */}
      {filteredAndSortedProducts.length === 0 && (
        <div className="no-products">
          <p>No products found matching your criteria.</p>
          <button onClick={handleClearFilters} className="clear-filters-btn">
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList; 