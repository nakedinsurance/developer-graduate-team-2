const { v4: uuidv4 } = require("uuid");

// checks if there is sufficient stock and updates products table

const processCheckout = (pool) => {
  return async (req, res) => {
    const { customerId, cart } = req.body; // Updated to match the cart structure
    // get customer id and products from req
    console.log(req.body);

    if (!customerId || !cart || cart.length === 0) {
      return res.status(400).json({ error: "Invalid input" });
    }

    const client = await pool.connect();
    // connect to pg
    try {
      await client.query("BEGIN");

      // Calculate total price and create order
      let totalPrice = 0;
      const orderId = uuidv4();
      const orderItems = [];

      // for each cart item, add its relevant information and run checks
     
        for (let i = 0; i < cart.length; i++) {
            item = cart[i]
        
        const { product, quantity } = item; // Adjusted to access product and quantity

        const productId = product.productid; // Accessing productId from the product object

        // Fetch product price
        const productResult = await client.query(
          "SELECT price, stock FROM product WHERE productId = $1",
          [productId]
        );
        const productData = productResult.rows[0];

        if (!productData || productData.stock < quantity) {
          return res
            .status(400)
            .json({ error: `Insufficient stock for productId ${productId}` });
        }

        totalPrice += productData.price * quantity;
        orderItems.push({
          orderId,
          productId,
          quantity,
          priceAtPurchase: productData.price,
        });

        // Update stock in the product table
        await client.query(
          "UPDATE product SET stock = stock - $1 WHERE productId = $2",
          [quantity, productId]
        );
      }

      // Create order
      await client.query(
        "INSERT INTO orders (orderId, customerId, totalPrice, orderStatus) VALUES ($1, $2, $3, $4)",
        [
          orderId,
          customerId,
          totalPrice,
          "pending", // Initial order status
        ]
      );

      // Create order items
      for (const orderItem of orderItems) {
        await client.query(
          "INSERT INTO order_items (orderItemId, orderId, productId, quantity, priceAtPurchase) VALUES ($1, $2, $3, $4, $5)",
          [
            uuidv4(),
            orderItem.orderId,
            orderItem.productId,
            orderItem.quantity,
            orderItem.priceAtPurchase,
          ]
        );
      }

      await client.query("COMMIT");
      res.status(201).json({ message: "Order created successfully", orderId });
    } catch (err) {
      // If any error occurs, rollback changes
      await client.query("ROLLBACK");
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    } finally {
      client.release();
    }
  };
};


module.exports = { processCheckout };
