// index.js
const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
const CheckoutRoutes = require("./Checkout/CheckoutRoute");
require("dotenv").config();

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

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
