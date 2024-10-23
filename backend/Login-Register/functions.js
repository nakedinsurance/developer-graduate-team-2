const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

const app = express();
const port = 5000;


app.use(cors());
app.use(bodyParser.json());

//
const pool = new Pool({
    user: 'your_db_user',
    host: 'localhost',
    database: 'your_db_name',
    password: 'your_db_password',
    port: 5432, 
});

// Registration route
app.post('/register', async (req, res) => {
    const { firstName, lastName, gender, age, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await pool.query(
            'INSERT INTO users (first_name, last_name, gender, age, email, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [firstName, lastName, gender, age, email, hashedPassword]
        );
        res.status(201).json({ message: 'User registered successfully!', user: newUser.rows[0] });
    } catch (error) {
        res.status(500).json({ error: 'Error registering user' });
    }
});

// Login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (user.rows.length > 0) {
            const isPasswordValid = await bcrypt.compare(password, user.rows[0].password);

            if (isPasswordValid) {
                res.status(200).json({ message: 'Login successful!', user: user.rows[0] });
            } else {
                res.status(401).json({ error: 'Invalid password' });
            }
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
