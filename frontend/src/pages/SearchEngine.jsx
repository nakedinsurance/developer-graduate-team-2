import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchEngine.css';

function SearchEngine() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    name: '',
    category: '',
    minPrice: '',
    maxPrice: ''
  });
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [entriesPerPage, setEntriesPerPage] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({
    key: 'name',
    direction: 'asc'
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    // Reset to first page when filters or entries per page changes
    setCurrentPage(1);
  }, [filters, entriesPerPage]);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:3000/api/products');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data);
      
      const uniqueCategories = [...new Set(data.map(item => item.category))].sort();
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
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

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Filter and sort products
  const getFilteredAndSortedProducts = () => {
    let filtered = products.filter(product => {
      const matchesName = product.name.toLowerCase().includes(filters.name.toLowerCase());
      const matchesCategory = !filters.category || product.category === filters.category;
      const matchesMinPrice = !filters.minPrice || product.price >= parseFloat(filters.minPrice);
      const matchesMaxPrice = !filters.maxPrice || product.price <= parseFloat(filters.maxPrice);
      
      return matchesName && matchesCategory && matchesMinPrice && matchesMaxPrice;
    });

    // Sort filtered products
    filtered.sort((a, b) => {
      let comparison = 0;
      if (sortConfig.key === 'price' || sortConfig.key === 'stock') {
        comparison = parseFloat(a[sortConfig.key]) - parseFloat(b[sortConfig.key]);
      } else {
        comparison = String(a[sortConfig.key]).localeCompare(String(b[sortConfig.key]));
      }
      return sortConfig.direction === 'asc' ? comparison : -comparison;
    });

    return filtered;
  };

  // Get current page products
  const getCurrentPageProducts = () => {
    const filtered = getFilteredAndSortedProducts();
    const startIndex = (currentPage - 1) * entriesPerPage;
    return filtered.slice(startIndex, startIndex + entriesPerPage);
  };

  const totalPages = Math.ceil(getFilteredAndSortedProducts().length / entriesPerPage);

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

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
            <button id="clearFilters" onClick={clearFilters}>
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      <div className="table-controls">
        <div className="entries-control">
          <span>Show</span>
          <select 
            value={entriesPerPage} 
            onChange={(e) => setEntriesPerPage(Number(e.target.value))}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <span>entries</span>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort('name')} className="sortable">
                Name
                {sortConfig.key === 'name' && (
                  <span className={`sort-indicator ${sortConfig.direction}`}>
                    {sortConfig.direction === 'asc' ? '▲' : '▼'}
                  </span>
                )}
              </th>
              <th onClick={() => handleSort('category')} className="sortable">
                Category
                {sortConfig.key === 'category' && (
                  <span className={`sort-indicator ${sortConfig.direction}`}>
                    {sortConfig.direction === 'asc' ? '▲' : '▼'}
                  </span>
                )}
              </th>
              <th>Description</th>
              <th onClick={() => handleSort('price')} className="sortable">
                Price
                {sortConfig.key === 'price' && (
                  <span className={`sort-indicator ${sortConfig.direction}`}>
                    {sortConfig.direction === 'asc' ? '▲' : '▼'}
                  </span>
                )}
              </th>
              <th onClick={() => handleSort('stock')} className="sortable">
                Stock
                {sortConfig.key === 'stock' && (
                  <span className={`sort-indicator ${sortConfig.direction}`}>
                    {sortConfig.direction === 'asc' ? '▲' : '▼'}
                  </span>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {getCurrentPageProducts().map(product => (
              <tr 
                key={product.productid}
                onClick={() => handleProductClick(product.productid)}
                className="table-row"
              >
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.description}</td>
                <td>R{parseFloat(product.price).toFixed(2)}</td>
                <td>
                  <span className={`stock-status ${
                    product.stock === 0 ? 'out-of-stock' : 
                    product.stock < 10 ? 'low-stock' : 
                    'in-stock'
                  }`}>
                    {product.stock === 0 ? 'Out of Stock' :
                     product.stock < 10 ? `${product.stock} left` :
                     `${product.stock} in stock`}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        <div className="table-info">
          Showing {((currentPage - 1) * entriesPerPage) + 1} to {Math.min(currentPage * entriesPerPage, getFilteredAndSortedProducts().length)} of {getFilteredAndSortedProducts().length} entries
        </div>
        <div className="pagination">
          <button 
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          >
            First
          </button>
          <button
            onClick={() => setCurrentPage(prev => prev - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          
          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === 'number' ? setCurrentPage(page) : null}
              className={`${currentPage === page ? 'active' : ''} ${typeof page !== 'number' ? 'ellipsis' : ''}`}
              disabled={typeof page !== 'number'}
            >
              {page}
            </button>
          ))}
          
          <button
            onClick={() => setCurrentPage(prev => prev + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
          >
            Last
          </button>
        </div>
      </div>
    </div>
    
  );

  
}

export default SearchEngine;
