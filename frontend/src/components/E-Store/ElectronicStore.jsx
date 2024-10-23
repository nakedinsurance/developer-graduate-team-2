import React, { useEffect, useState } from "react";
import { v4 } from "uuid";

// SVG Icons as components
const CartIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M9 20C9 21.1046 8.10457 22 7 22C5.89543 22 5 21.1046 5 20C5 18.8954 5.89543 18 7 18C8.10457 18 9 18.8954 9 20Z" />
    <path d="M20 20C20 21.1046 19.1046 22 18 22C16.8954 22 16 21.1046 16 20C16 18.8954 16.8954 18 18 18C19.1046 18 20 18.8954 20 20Z" />
    <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H17.4C17.8693 16.009 18.3268 15.8526 18.6925 15.5583C19.0581 15.264 19.3086 14.8504 19.4 14.39L21 6H6" />
  </svg>
);

const PlusIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M12 5V19M5 12H19" />
  </svg>
);

const MinusIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M5 12H19" />
  </svg>
);

// CSS Styles
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "none",
  },
  overlayVisible: {
    display: "block",
  },
  cartPanel: {
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    width: "400px",
    backgroundColor: "white",
    boxShadow: "-2px 0 8px rgba(0, 0, 0, 0.1)",
    transform: "translateX(100%)",
    transition: "transform 0.3s ease",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
  },
  cartPanelVisible: {
    transform: "translateX(0)",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
    margin: "0",
  },
  cartButton: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 16px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    background: "white",
    cursor: "pointer",
  },
  cartBadge: {
    position: "absolute",
    top: "-8px",
    right: "-8px",
    background: "#ef4444",
    color: "white",
    borderRadius: "50%",
    padding: "2px 6px",
    fontSize: "12px",
    minWidth: "20px",
    textAlign: "center",
  },
  productsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
    padding: "20px 0",
  },
  // ... (rest of the styles from previous version)
};

const fetchProductsAndSet = async (setProducts) => {
    try {
      const response = await fetch("http://localhost:4280/products", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
  
      const data = await response.json(); // Parse the JSON response
      setProducts(data); // Set the products state with fetched data
  
    } catch (e) {
      console.error(e);
      return "Server error";
    }
  };
  

const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "ZAR",
  }).format(price);
};

// Cart Panel Component
const CartPanel = ({
  isOpen,
  onClose,
  cart,
  addToCart,
  removeFromCart,
  handleCheckout,
}) => {
  const getTotalPrice = () => {
    return Object.values(cart).reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  };

  return (
    <>
      <div
        style={{ ...styles.overlay, ...(isOpen ? styles.overlayVisible : {}) }}
        onClick={onClose}
      />
      <div
        style={{
          ...styles.cartPanel,
          ...(isOpen ? styles.cartPanelVisible : {}),
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <h2 style={{ margin: 0 }}>Shopping Cart</h2>
          <button
            onClick={onClose}
            style={{ border: "none", background: "none", cursor: "pointer" }}
          >
            ×
          </button>
        </div>

        <div style={{ flex: 1, overflowY: "auto" }}>
          {Object.values(cart).map(({ product, quantity }) => (
            <div key={product.productid} style={styles.cartItem}>
              <div style={styles.cartItemInfo}>
                {/* <img src="/Laptop.jpg"/> */}
                <h3 style={styles.cartItemName}>{product.name}</h3>
                <p style={styles.cartItemPrice}>
                  {formatPrice(product.price)} × {quantity}
                </p>
              </div>
              <div style={styles.quantityControls}>
                <button
                  style={styles.quantityButton}
                  onClick={() => removeFromCart(product.productid)}
                >
                  <MinusIcon />
                </button>
                <span>{quantity}</span>
                <button
                  style={styles.quantityButton}
                  onClick={() => addToCart(product)}
                  disabled={quantity >= product.stock}
                >
                  <PlusIcon />
                </button>
              </div>
            </div>
          ))}
          {Object.keys(cart).length === 0 && (
            <p style={styles.emptyCart}>Your cart is empty</p>
          )}
        </div>

        {Object.keys(cart).length > 0 && (
          <div style={styles.cartTotal}>
            <div style={styles.priceContainer}>
              <span>Total:</span>
              <span style={styles.price}>{formatPrice(getTotalPrice())}</span>
            </div>
            <button style={styles.checkoutButton} onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};


const ElectronicsStore = () => {
    const [cart, setCart] = useState([]);
const [isCartOpen, setIsCartOpen] = useState(false);
const [showCheckoutSuccess, setShowCheckoutSuccess] = useState(false);
const [products, setProducts] = useState([]);

  const addToCart = (product) => {
  setCart((prevCart) => {
    const existingProductIndex = prevCart.findIndex(item => item.product.productid === product.productid);
    if (existingProductIndex > -1) {
      const existingProduct = prevCart[existingProductIndex];
      if (existingProduct.quantity < product.stock) {
        // Update the quantity of the existing product
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex] = {
          ...existingProduct,
          quantity: existingProduct.quantity + 1,
        };
        return updatedCart;
      }
    } else {
      // Add new product to the cart
      return [
        ...prevCart,
        { product, quantity: 1 },
      ];
    }
    return prevCart;
  });
};

const removeFromCart = (productId) => {
  setCart((prevCart) => {
    const existingProductIndex = prevCart.findIndex(item => item.product.productid === productId);
    if (existingProductIndex > -1) {
      const existingProduct = prevCart[existingProductIndex];
      if (existingProduct.quantity <= 1) {
        // Remove the product from the cart if quantity is 1 or less
        return prevCart.filter((_, index) => index !== existingProductIndex);
      } else {
        // Decrease the quantity of the existing product
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex] = {
          ...existingProduct,
          quantity: existingProduct.quantity - 1,
        };
        return updatedCart;
      }
    }
    return prevCart;
  });
};

  const handleCheckout = async() => {
    setShowCheckoutSuccess(true);
    setCart({});
    setIsCartOpen(false);
    setTimeout(() => setShowCheckoutSuccess(false), 3000);

    try {
        const response = await fetch("http://localhost:4280/api/checkout", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ customerId: v4() , products : cart  }),
        });
    
        if (!response.ok) {
          throw new Error("Failed to a checkout");
        }
        console.log("Successfully added to db")
    
      } catch (e) {
        console.error(e);
        return "Server error";
      }
  };



  useEffect(() => {
    fetchProductsAndSet(setProducts); // Fetch products on mount
  }, []); // Empty dependency array means this runs once

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Electronics Store</h1>

        <button style={styles.cartButton} onClick={() => setIsCartOpen(true)}>
          <CartIcon />
          Cart
          {Object.keys(cart).length > 0 && (
            <span style={styles.cartBadge}>
              {Object.values(cart).reduce(
                (acc, item) => acc + item.quantity,
                0
              )}
            </span>
          )}
        </button>
      </div>

      {showCheckoutSuccess && (
        <div style={styles.successAlert}>
          Order placed successfully! Thank you for your purchase.
        </div>
      )}

      <div style={styles.productsGrid}>
        {products.map((product) => (
          <div key={product.productid} style={styles.productCard}>
            <div style={styles.cardHeader}>
              <h2 style={styles.cardTitle}>{product.name}</h2>
              <p style={styles.cardDescription}>{product.description}</p>
            </div>
            <div style={styles.cardContent}>
              <div style={styles.priceContainer}>
                <span style={styles.price}>{formatPrice(product.price)}</span>
                <span style={styles.stock}>Stock: {product.stock}</span>
              </div>
            </div>
            <div style={styles.cardFooter}>
              <button
                style={{
                  ...styles.addButton,
                  ...(product.stock === 0 ||
                  (cart[product.productid]?.quantity || 0) >= product.stock
                    ? styles.addButtonDisabled
                    : {}),
                }}
                onClick={() => addToCart(product)}
                disabled={
                  product.stock === 0 ||
                  (cart[product.productid]?.quantity || 0) >= product.stock
                }
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      <CartPanel
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        handleCheckout={handleCheckout}
      />
    </div>
  );
};

export default ElectronicsStore;
