const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const pgp = require('pg-promise')();

const app = express();
const PORT = 3000;

// PostgreSQL connection
const db = pgp('postgres://postgres:password@localhost:5432/postgres');

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Test database connection
db.connect()
  .then(obj => {
    obj.done(); // success, release the connection
    console.log('Database connection successful');
  })
  .catch(error => {
    console.error('ERROR:', error.message || error);
  });

// Get Product Categories
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
