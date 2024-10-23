const express = require('express');
const bodyParser = require('body-parser');
const pgp = require('pg-promise')();

const app = express();
const PORT = 3000;

// PostgreSQL connection
const db = pgp('postgres://postgres:password@localhost:5433/postgres');

// Middleware
app.use(bodyParser.json());

// Test database connection
db.connect()
  .then(obj => {
    obj.done(); // success, release the connection
    console.log('Database connection successful');
  })
  .catch(error => {
    console.error('ERROR:', error.message || error);
  });

// ------------------------------------------
// Wishlist API Endpoints
// ------------------------------------------

// Get Wishlist for a customer
app.get('/api/wishlist/:customerId', (req, res) => {
  const customerId = req.params.customerId;

  db.any('SELECT p.name, p.description, p.price FROM wishlist w JOIN product p ON w.productId = p.productId WHERE w.customerId = $1', [customerId])
    .then((wishlist) => {
      if (wishlist.length === 0) {
        return res.status(404).json({ message: 'No wishlist items found for this customer' });
      }
      res.status(200).json(wishlist);
    })
    .catch((error) => {
      console.error('ERROR:', error);
      res.status(500).json({ error: 'Failed to retrieve wishlist' });
    });
});

// Add Item to Wishlist
app.post('/api/wishlist', (req, res) => {
  const { customerId, productId } = req.body;

  db.none('INSERT INTO wishlist (wishlistId, customerId, productId, dateAdded) VALUES (uuid_generate_v4(), $1, $2, CURRENT_TIMESTAMP)', [customerId, productId])
    .then(() => {
      res.status(201).json({ message: 'Product added to wishlist' });
    })
    .catch((error) => {
      console.error('ERROR:', error);
      res.status(500).json({ error: 'Failed to add product to wishlist' });
    });
});

// Remove Item from Wishlist
app.delete('/api/wishlist/:customerId/:productId', (req, res) => {
  const { customerId, productId } = req.params;

  db.result('DELETE FROM wishlist WHERE customerId = $1 AND productId = $2', [customerId, productId])
    .then((result) => {
      if (result.rowCount === 0) {
        return res.status(404).json({ message: 'Product not found in wishlist' });
      }
      res.status(200).json({ message: 'Product removed from wishlist' });
    })
    .catch((error) => {
      console.error('ERROR:', error);
      res.status(500).json({ error: 'Failed to remove product from wishlist' });
    });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
