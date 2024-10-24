const express = require('express');//framework building the web application
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');//PostgreSQL connection(pool interaction)
const bcrypt = require('bcryptjs');//library for hashinghashing

const app = express();
const port = 5000; // Define the port number for the server to listen on.


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
    const name = `${firstName} ${lastName}`;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert into customers table (UUID will be generated automatically)
        const customerResult = await pool.query(
            'INSERT INTO customers (name, email, age, gender) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, email, age, gender]
        );

        const customerId = customerResult.rows[0].customerid;

        
        const newUser = await pool.query(
            'INSERT INTO users (customerId, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
            [customerId, email, hashedPassword, 'customer']
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
        const userResult = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );

        if (userResult.rows.length > 0) {
            const user = userResult.rows[0];
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (isPasswordValid) {
                // Fetch customer details using customerId
                const customerResult = await pool.query(
                    'SELECT * FROM customers WHERE customerId = $1',
                    [user.customerid]
                );

                const customer = customerResult.rows[0];
                res.status(200).json({ message: 'Login successful!', user, customer });
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
    console.log(`http://localhost:5173/:${port}`);
});
