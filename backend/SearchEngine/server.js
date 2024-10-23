// server.js
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const path = require('path');

// Initialize Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Database connection
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'clothed_electronics',
    password: 'postgres',
    port: 5432,
});

// Test database connection
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to database successfully');
    }
});

// Utility function for recommendations
function calculateSimilarity(productA, productB) {
    const categoryMatch = productA.category === productB.category ? 1 : 0;
    const priceRange = Math.abs(productA.price - productB.price) / Math.max(productA.price, productB.price);
    return (categoryMatch * 0.7) + ((1 - priceRange) * 0.3);
}

// Routes

// Get all products
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

// Get personal recommendations based on purchase history and similarity
app.get('/api/products/recommendations/personal/:customerId', async (req, res) => {
    try {
        const { customerId } = req.params;
        
        // Get customer's purchase history
        const purchaseHistory = await pool.query(`
            SELECT 
                p.productid,
                p.name,
                p.category,
                p.price,
                p.description
            FROM product p
            JOIN customer_product cp ON p.productid = cp.productid
            WHERE cp.customerid = $1
        `, [customerId]);

        // If no purchase history, return popular products
        if (purchaseHistory.rows.length === 0) {
            const popularProducts = await pool.query(`
                SELECT 
                    p.productid,
                    p.name,
                    p.category,
                    p.price,
                    p.description,
                    COUNT(cp.customerid) as purchase_count
                FROM product p
                LEFT JOIN customer_product cp ON p.productid = cp.productid
                GROUP BY p.productid, p.name, p.category, p.price, p.description
                ORDER BY purchase_count DESC
                LIMIT 5
            `);
            return res.json(popularProducts.rows);
        }

        // Get products not yet purchased by the customer
        const allProducts = await pool.query(`
            SELECT 
                productid, 
                name, 
                category, 
                price, 
                description 
            FROM product
            WHERE productid NOT IN (
                SELECT productid 
                FROM customer_product 
                WHERE customerid = $1
            )
        `, [customerId]);

        // Calculate recommendations based on similarity
        const recommendations = allProducts.rows.map(product => {
            const similarityScore = purchaseHistory.rows.reduce((score, historicProduct) => {
                return score + calculateSimilarity(product, historicProduct);
            }, 0) / purchaseHistory.rows.length;

            return {
                ...product,
                similarityScore
            };
        });

        // Return top 5 recommendations sorted by similarity
        res.json(recommendations
            .sort((a, b) => b.similarityScore - a.similarityScore)
            .slice(0, 5));

    } catch (error) {
        console.error('Error getting recommendations:', error);
        res.status(500).json({ error: 'Error getting recommendations' });
    }
});

// Get popular products based on purchase count
app.get('/api/products/recommendations/popular', async (req, res) => {
    try {
        const query = `
            SELECT 
                p.productid,
                p.name,
                p.category,
                p.price,
                p.description,
                COUNT(cp.customerid) as purchase_count
            FROM product p
            LEFT JOIN customer_product cp ON p.productid = cp.productid
            GROUP BY p.productid, p.name, p.category, p.price, p.description
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

// Get products by category with popularity data
app.get('/api/products/category/:category', async (req, res) => {
    try {
        const { category } = req.params;
        const query = `
            SELECT 
                p.productid,
                p.name,
                p.category,
                p.price,
                p.description,
                p.stock,
                COUNT(cp.customerid) as purchase_count
            FROM product p
            LEFT JOIN customer_product cp ON p.productid = cp.productid
            WHERE p.category = $1
            GROUP BY p.productid, p.name, p.category, p.price, p.description, p.stock
            ORDER BY purchase_count DESC
        `;
        
        const result = await pool.query(query, [category]);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching products by category:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        error: 'Something broke!',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
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