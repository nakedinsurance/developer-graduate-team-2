import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Wishlist.css'; // Import a CSS file for styling

const Wishlist = ({ customerId }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/wishlist/${customerId}`);
        setWishlist(response.data);
        setLoading(false); // Stop loading once data is fetched
      } catch (err) {
        console.error(err);
        console.log('Error fetching wishlist');
        setLoading(false); // Stop loading on error
      }
    };

    fetchWishlist();
  }, [customerId]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading wishlist...</p>
      </div>
    );
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="wishlist-container">
      <h1>Customer Wishlist</h1>
      {wishlist.length === 0 ? (
        <p>No items in your wishlist.</p>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((item, index) => (
            <div key={index} className="wishlist-card">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p className="price">Price: R {item.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
