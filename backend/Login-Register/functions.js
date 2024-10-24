const express = require('express'); // framework for building the web application
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs'); // library for hashing passwords
const pgp = require('pg-promise')(); // pg-promise for PostgreSQL connection

const app = express();
const port = 4000; // Define the port number for the server to listen on.

app.use(cors());
app.use(bodyParser.json());

// PostgreSQL connection using pg-promise
const db = pgp({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'password',
    port: 5432,
});

// Registration route
app.post('/register', async (req, res) => {
    const { firstName, lastName, gender, age, email, password } = req.body;
    const name = `${firstName} ${lastName}`;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        // Transaction block to ensure both insertions (customer and user_auth) succeed or fail together
        await db.tx(async t => {
            // Insert into customer table (UUID will be generated automatically)
            const customerResult = await t.one(
                'INSERT INTO customer (name, email, age, gender) VALUES ($1, $2, $3, $4) RETURNING *',
                [name, email, age, gender]
            );
            const customerId = customerResult.customerid;

            // Insert into user_auth table
            const newUser = await t.one(
                'INSERT INTO user_auth (customerid, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING *',
                [customerId, email, hashedPassword, 'customer']
            );

            res.status(201).json({ message: 'User registered successfully!', user: newUser });
        });
    } catch (error) {
        res.status(500).json({ error: 'Error registering user' });
    }
});

// Login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const userResult = await db.oneOrNone(
            'SELECT * FROM user_auth WHERE email = $1',
            [email]
        );

        if (userResult) {
            const isPasswordValid = await bcrypt.compare(password, userResult.password_hash);

            if (isPasswordValid) {
                // Fetch customer details using customerId
                const customerResult = await db.oneOrNone(
                    'SELECT * FROM customer WHERE customerid = $1',
                    [userResult.customerid]
                );

                res.status(200).json({ message: 'Login successful!', user: userResult, customer: customerResult });
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
    console.log(`http://localhost:${port}`);
});