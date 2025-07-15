/**
 * Product catalog data containing all available products for the e-commerce store
 * Each product includes comprehensive information for display and cart functionality
 */
export const products = [
  {
    id: 1,                        // Unique product identifier
    name: "MacBook Pro 16-inch",  // Product display name
    price: 2499,                  // Current selling price in USD
    originalPrice: 2799,          // Original price for discount calculation
    description: "The most powerful MacBook Pro ever. Supercharged by M2 Pro and M2 Max chips. Built for developers, creative professionals, and power users.",
    category: "Laptops",          // Product category for filtering
    brand: "Apple",               // Brand name for filtering and display
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=400&fit=crop&auto=format", // Product image URL
    features: [                   // Key product features for marketing
      "M2 Pro or M2 Max chip",
      "Up to 96GB unified memory",
      "22-hour battery life",
      "Liquid Retina XDR display",
      "1080p FaceTime HD camera"
    ],
    specifications: {             // Technical specifications for product detail page
      screen: "16.2-inch Liquid Retina XDR",
      processor: "Apple M2 Pro",
      memory: "16GB unified memory",
      storage: "512GB SSD",
      graphics: "19-core GPU"
    },
    inStock: true,               // Availability status
    rating: 4.8,                 // Average customer rating (out of 5)
    reviews: 342                 // Number of customer reviews
  },
  {
    id: 2,
    name: "iPhone 15 Pro",
    price: 999,
    originalPrice: 1099,
    description: "iPhone 15 Pro. Forged in titanium and featuring the groundbreaking A17 Pro chip, a customizable Action Button, and the most powerful iPhone camera system ever.",
    category: "Smartphones",
    brand: "Apple",
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=500&h=400&fit=crop&auto=format",
    features: [
      "A17 Pro chip",
      "Pro camera system",
      "Action Button",
      "USB-C connector",
      "Titanium design"
    ],
    specifications: {
      screen: "6.1-inch Super Retina XDR",
      processor: "A17 Pro chip",
      storage: "128GB",
      camera: "48MP Main camera",
      battery: "Up to 23 hours video playback"
    },
    inStock: true,
    rating: 4.7,
    reviews: 128
  },
  {
    id: 3,
    name: "AirPods Pro (2nd gen)",
    price: 249,
    originalPrice: 279,
    description: "AirPods Pro feature up to 2x more Active Noise Cancellation, plus Adaptive Transparency, and Personalized Spatial Audio with dynamic head tracking.",
    category: "Audio",
    brand: "Apple",
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500&h=400&fit=crop&auto=format",
    features: [
      "Active Noise Cancellation",
      "Adaptive Transparency",
      "Personalized Spatial Audio",
      "Touch control",
      "MagSafe charging case"
    ],
    specifications: {
      batteryLife: "Up to 6 hours listening time",
      chargingCase: "MagSafe charging case",
      connectivity: "Bluetooth 5.3",
      waterResistance: "IPX4",
      chipset: "Apple H2 chip"
    },
    inStock: true,
    rating: 4.6,
    reviews: 89
  },
  {
    id: 4,
    name: "Sony WH-1000XM5",
    price: 399,
    originalPrice: 449,
    description: "Industry-leading noise canceling with Dual Noise Sensor technology. Next-level music with Edge-AI, for the ultimate listening experience.",
    category: "Audio",
    brand: "Sony",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=400&fit=crop&auto=format",
    features: [
      "Industry-leading noise canceling",
      "30-hour battery life",
      "Multipoint connection",
      "Touch sensor controls",
      "Speak-to-chat technology"
    ],
    specifications: {
      batteryLife: "Up to 30 hours",
      chargingTime: "3 hours",
      connectivity: "Bluetooth 5.2",
      weight: "250g",
      driver: "30mm driver"
    },
    inStock: true,
    rating: 4.5,
    reviews: 234
  },
  {
    id: 5,
    name: "iPad Pro 12.9-inch",
    price: 1099,
    originalPrice: 1199,
    description: "The ultimate iPad experience with the most advanced technology. Featuring the M2 chip, Liquid Retina XDR display, and works with Apple Pencil.",
    category: "Tablets",
    brand: "Apple",
    image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500&h=400&fit=crop&auto=format",
    features: [
      "M2 chip performance",
      "12.9-inch Liquid Retina XDR display",
      "Apple Pencil support",
      "Face ID security",
      "All-day battery life"
    ],
    specifications: {
      screen: "12.9-inch Liquid Retina XDR",
      processor: "Apple M2 chip",
      storage: "128GB",
      camera: "12MP Wide camera",
      connectivity: "Wi-Fi 6E"
    },
    inStock: false,
    rating: 4.9,
    reviews: 156
  },
  {
    id: 6,
    name: "Samsung Galaxy S24 Ultra",
    price: 1199,
    originalPrice: 1299,
    description: "Meet Galaxy S24 Ultra, the ultimate form of Galaxy Ultra with a new titanium exterior and a 200MP camera with AI zoom that goes beyond anything before.",
    category: "Smartphones",
    brand: "Samsung",
    image: "https://images.unsplash.com/photo-1596558450255-7c0b7be9d56a?w=500&h=400&fit=crop&auto=format",
    features: [
      "200MP camera with AI zoom",
      "Titanium frame",
      "S Pen included",
      "Circle to Search with Google",
      "Galaxy AI features"
    ],
    specifications: {
      screen: "6.8-inch Dynamic AMOLED 2X",
      processor: "Snapdragon 8 Gen 3",
      memory: "12GB RAM",
      storage: "256GB",
      battery: "5000mAh"
    },
    inStock: true,
    rating: 4.4,
    reviews: 78
  }
];

/**
 * Available product categories for filtering
 * Includes "All Products" option to show everything
 */
export const categories = [
  "All Products",    // Special option to show all products
  "Laptops", 
  "Smartphones",
  "Tablets",
  "Audio"
];

/**
 * Available brands for filtering
 * Includes "All Brands" option to show everything
 */
export const brands = [
  "All Brands",      // Special option to show all brands
  "Apple",
  "Samsung", 
  "Sony"
];

/**
 * Find a specific product by its ID
 * @param {string|number} id - Product ID to search for
 * @returns {Object|undefined} Product object or undefined if not found
 */
export const getProductById = (id) => {
  return products.find(product => product.id === parseInt(id));
};

/**
 * Filter products by category
 * @param {string} category - Category name to filter by
 * @returns {Array} Array of products in the specified category
 */
export const getProductsByCategory = (category) => {
  if (category === "All Products") return products;
  return products.filter(product => product.category === category);
};

/**
 * Filter products by brand
 * @param {string} brand - Brand name to filter by
 * @returns {Array} Array of products from the specified brand
 */
export const getProductsByBrand = (brand) => {
  if (brand === "All Brands") return products;
  return products.filter(product => product.brand === brand);
}; 