// pages/SearchEngine.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchEngine.css';

function SearchEngine() {
  const [products, setProducts] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [filters, setFilters] = useState({
    name: '',
    category: '',
    minPrice: '',
    maxPrice: ''
  });
  const [activeTab, setActiveTab] = useState('popular');
  const [customerId, setCustomerId] = useState('');
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    loadRecommendations('popular');
  }, []);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      // Update this URL to match your API endpoint
      const response = await fetch('http://localhost:3000/api/products');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data);
      
      // Extract unique categories
      const uniqueCategories = [...new Set(data.map(item => item.category))].sort();
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadRecommendations = async (type, id = null) => {
    try {
      let url = 'http://localhost:3000/api/products/recommendations/';
      switch(type) {
        case 'popular':
          url += 'popular';
          break;
        case 'personal':
          if (!id) return;
          url += `personal/${id}`;
          break;
        default:
          return;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setRecommendations(data);
    } catch (error) {
      console.error('Error loading recommendations:', error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({
      name: '',
      category: '',
      minPrice: '',
      maxPrice: ''
    });
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  // Filter products based on current filters
  const filteredProducts = products.filter(product => {
    const matchesName = product.name.toLowerCase().includes(filters.name.toLowerCase());
    const matchesCategory = !filters.category || product.category === filters.category;
    const matchesMinPrice = !filters.minPrice || product.price >= parseFloat(filters.minPrice);
    const matchesMaxPrice = !filters.maxPrice || product.price <= parseFloat(filters.maxPrice);
    
    return matchesName && matchesCategory && matchesMinPrice && matchesMaxPrice;
  });

  if (isLoading) {
    return <div className="loading">Loading products...</div>;
  }

  return (
    <div className="container">
      <h1>Clothed Electronics Products</h1>
      
      <div className="search-section">
        <h2>Search and Filter Products</h2>
        <div className="search-controls">
          <div className="search-group">
            <label htmlFor="nameSearch">Product Name</label>
            <input
              type="text"
              id="nameSearch"
              name="name"
              value={filters.name}
              onChange={handleFilterChange}
              placeholder="Search by name..."
            />
          </div>
          
          <div className="search-group">
            <label htmlFor="categoryFilter">Category</label>
            <select
              id="categoryFilter"
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          
          <div className="search-group">
            <label htmlFor="priceMin">Min Price</label>
            <input
              type="number"
              id="priceMin"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleFilterChange}
              placeholder="Min price..."
            />
          </div>
          
          <div className="search-group">
            <label htmlFor="priceMax">Max Price</label>
            <input
              type="number"
              id="priceMax"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              placeholder="Max price..."
            />
          </div>
          
          <div className="search-group">
            <label>&nbsp;</label>
            <button id="clearFilters" onClick={clearFilters}>
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      <div className="products-grid">
        {filteredProducts.map(product => (
          <div 
            key={product.productid} 
            className="product-card"
            onClick={() => handleProductClick(product.productid)}
          >
            <h3>{product.name}</h3>
            <div className="category">{product.category}</div>
            <div className="price">R{parseFloat(product.price).toFixed(2)}</div>
            <div className="description">{product.description.substring(0, 100)}...</div>
            <div className={`stock-status ${
              product.stock === 0 ? 'out-of-stock' : 
              product.stock < 10 ? 'low-stock' : 
              'in-stock'
            }`}>
              {product.stock === 0 ? 'Out of Stock' :
               product.stock < 10 ? `${product.stock} left` :
               `${product.stock} in stock`}
            </div>
          </div>
        ))}
      </div>

      <div className="recommendations-section">
        <h2>Recommended Products</h2>
        <div className="recommendation-tabs">
          <button
            className={`tab-button ${activeTab === 'popular' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('popular');
              loadRecommendations('popular');
            }}
          >
            Popular Products
          </button>
          <button
            className={`tab-button ${activeTab === 'personal' ? 'active' : ''}`}
            onClick={() => setActiveTab('personal')}
          >
            Personal Recommendations
          </button>
          {activeTab === 'personal' && (
            <input
              type="text"
              id="customerIdInput"
              value={customerId}
              onChange={(e) => {
                setCustomerId(e.target.value);
                if (e.target.value) {
                  loadRecommendations('personal', e.target.value);
                }
              }}
              placeholder="Enter Customer ID"
            />
          )}
        </div>
        
        <div className="recommendations-grid">
          {recommendations.map(product => (
            <div 
              key={product.productid} 
              className="recommendation-card"
              onClick={() => handleProductClick(product.productid)}
            >
              <h3>{product.name}</h3>
              <div className="category">{product.category}</div>
              <div className="price">
                ${parseFloat(product.price).toFixed(2)}
              </div>
              <div className="description">
                {product.description.substring(0, 100)}...
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchEngine;