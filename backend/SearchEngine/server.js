// server.js
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'clothed_electronics',
    password: 'postgres',
    port: 5432,
});

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