// index.js
const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
const CheckoutRoutes = require("./Checkout/CheckoutRoute");
require("dotenv").config();
const bodyParser = require('body-parser');
const pgp = require('pg-promise')();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.use("/api/checkout", CheckoutRoutes(pool));

app.get("/products", async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM product`);
    res.json(result.rows);
  } catch (e) {
    console.error(e)
    res.status(500).send("Server error")
  }
});



// altaafs
const db = pgp('postgres://postgres:Naked123@localhost:5433/postgres');
app.use(bodyParser.json());

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

// nqobiles
app.get('/api/products', async (req, res) => {
  try {
      const query = `
          SELECT 
              productid, 
              name, 
              description, 
              category, 
              price, 
              stock 
          FROM product 
          ORDER BY name
      `;
      const result = await pool.query(query);
      res.json(result.rows);
  } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

// Get popular products (based on purchase count)
app.get('/api/products/recommendations/popular', async (req, res) => {
  try {
      const query = `
          SELECT 
              p.productid,
              p.name,
              p.category,
              p.description,
              p.price,
              p.stock,
              COUNT(cp.customerid) as purchase_count
          FROM product p
          LEFT JOIN customer_product cp ON p.productid = cp.productid
          GROUP BY 
              p.productid, 
              p.name, 
              p.category, 
              p.description,
              p.price,
              p.stock
          ORDER BY purchase_count DESC
          LIMIT 5
      `;
      
      const result = await pool.query(query);
      res.json(result.rows);
  } catch (error) {
      console.error('Error getting popular products:', error);
      res.status(500).json({ error: 'Error getting popular products' });
  }
});

// Get personalized recommendations
app.get('/api/products/recommendations/personal/:customerId', async (req, res) => {
  try {
      const { customerId } = req.params;

      // First, get categories this customer usually buys from
      const categoryQuery = `
          SELECT 
              p.category,
              COUNT(*) as category_count
          FROM customer_product cp
          JOIN product p ON cp.productid = p.productid
          WHERE cp.customerid = $1
          GROUP BY p.category
          ORDER BY category_count DESC
          LIMIT 2
      `;

      const categoryResult = await pool.query(categoryQuery, [customerId]);
      
      if (categoryResult.rows.length === 0) {
          // If no purchase history, return popular products
          return res.redirect('/api/products/recommendations/popular');
      }

      // Get preferred categories
      const preferredCategories = categoryResult.rows.map(row => row.category);

      // Get recommendations based on preferred categories
      const recommendationsQuery = `
          SELECT 
              p.productid,
              p.name,
              p.category,
              p.description,
              p.price,
              p.stock
          FROM product p
          WHERE 
              p.category = ANY($1::text[])
              AND p.productid NOT IN (
                  SELECT productid 
                  FROM customer_product 
                  WHERE customerid = $2
              )
          ORDER BY 
              CASE 
                  WHEN p.category = $3 THEN 0 
                  ELSE 1 
              END,
              p.price DESC
          LIMIT 5
      `;

      const result = await pool.query(
          recommendationsQuery, 
          [preferredCategories, customerId, preferredCategories[0]]
      );

      res.json(result.rows);
  } catch (error) {
      console.error('Error getting personalized recommendations:', error);
      res.status(500).json({ error: 'Error getting recommendations' });
  }
});

// Sims
app.get('/api/products/categories', (req, res) => {
  db.any('SELECT DISTINCT category FROM product')
    .then((categories) => {
      res.status(200).json(categories);
    })
    .catch((error) => {
      console.error('ERROR:', error);
      res.status(500).json({ error: 'Failed to retrieve categories' });
    });
});

// Get Product by Name
app.get('/api/products/:name', (req, res) => {
  const Productname = req.params.name;

  db.oneOrNone('SELECT * FROM product WHERE name = $1', [Productname])
    .then((product) => {
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.status(200).json(product);
    })
    .catch((error) => {
      console.error('ERROR:', error);
      res.status(500).json({ error: 'Failed to retrieve product' });
    });
});

// Get All Products
app.get('/api/products', (req, res) => {
    const query = 'SELECT * FROM product';
  
    db.any(query)
      .then((products) => {
        res.status(200).json(products);
      })
      .catch((error) => {
        console.error('ERROR:', error);
        res.status(500).json({ error: 'Failed to retrieve products' });
      });
  });

// Add Product
app.post('/api/products', (req, res) => {
  const { name, description, price, stock, category } = req.body;

  db.none('INSERT INTO product(name, description, price, stock, category) VALUES($1, $2, $3, $4, $5)', 
    [name, description, price, stock, category])
    .then(() => {
      res.status(201).json({ message: 'Product added successfully' });
    })
    .catch((error) => {
      console.error('ERROR:', error);
      res.status(500).json({ error: 'Failed to add product' });
    });
});

// Update Product
app.put('/api/products/:productid', (req, res) => {
  const productId = req.params.productid;
  const { name, description, price, stock, category } = req.body;

  db.none('UPDATE product SET name = $1, description = $2, price = $3, stock = $4, category = $5 WHERE productid = $6', 
    [name, description, price, stock, category, productId])
    .then(() => {
      res.status(200).json({ message: 'Product updated successfully' });
    })
    .catch((error) => {
      console.error('ERROR:', error);
      res.status(500).json({ error: 'Failed to update product' });
    });
});

// Update Product Price
app.put('/api/products/:productid/price', (req, res) => {
  const productId = req.params.productid;
  const { price } = req.body;

  db.none('UPDATE product SET price = $1 WHERE productid = $2', [price, productId])
    .then(() => {
      res.status(200).json({ message: 'Product price updated successfully' });
    })
    .catch((error) => {
      console.error('ERROR:', error);
      res.status(500).json({ error: 'Failed to update product price' });
    });
});

// Update Product Stock
app.put('/api/products/:productid/stock', (req, res) => {
  const productId = req.params.productid;
  const { stock } = req.body;

  db.none('UPDATE product SET stock = $1 WHERE productid = $2', [stock, productId])
    .then(() => {
      res.status(200).json({ message: 'Product stock updated successfully' });
    })
    .catch((error) => {
      console.error('ERROR:', error);
      res.status(500).json({ error: 'Failed to update product stock' });
    });
});

// Delete Product
app.delete('/api/products/:productid', (req, res) => {
  const productId = req.params.productid;

  db.result('DELETE FROM product WHERE productid = $1', [productId])
    .then((result) => {
      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.status(200).json({ message: 'Product deleted successfully' });
    })
    .catch((error) => {
      console.error('ERROR:', error);
      res.status(500).json({ error: 'Failed to delete product' });
    });
});

// Generate Inventory Report
app.get('/api/inventory-report', (req, res) => {
    const report = {};
  
    // Get total number of products
    db.one('SELECT COUNT(*) AS count FROM product')
      .then((totalProducts) => {
        report.totalProducts = totalProducts.count;
        console.log('Total Products:', report.totalProducts);
  
        // Get total stock value (price * stock)
        return db.one('SELECT SUM(price * stock) AS totalStockValue FROM product');
      })
      .then((totalStockValue) => {
        report.totalStockValue = totalStockValue.totalstockvalue;
        console.log('Total Stock Value:', report.totalStockValue);
  
        // Get number of products per category
        return db.any('SELECT category, COUNT(*) AS productCount FROM product GROUP BY category');
      })
      .then((categoryCounts) => {
        report.categoryCounts = categoryCounts;
        console.log('Category Counts:', report.categoryCounts);
  
        // Get list of products with low stock
        return db.any('SELECT * FROM product WHERE stock <= 3');
      })
      .then((lowStockProducts) => {
        report.lowStockProducts = lowStockProducts;
        console.log('Low Stock Products:', report.lowStockProducts);
  
        res.status(200).json(report);
      })
      .catch((error) => {
        console.error('ERROR:', error);
        res.status(500).json({ error: 'Failed to generate inventory report' });
      });
  });



// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

process.on('SIGTERM', () => {
  console.info('SIGTERM signal received.');
  console.log('Closing HTTP server.');
  server.close(() => {
      console.log('HTTP server closed.');
      pool.end(() => {
          console.log('Database pool closed.');
          process.exit(0);
      });
  });
});
