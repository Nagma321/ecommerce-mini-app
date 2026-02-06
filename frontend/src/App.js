import React, { useEffect, useState } from "react";
import "./App.css";

function App() {

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  // Fetch products
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products/")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  // Add to cart
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  // Remove from cart
  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  // Total price
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      <div className="navbar">
        My E-Commerce Store 🛍️ | Cart: {cart.length}
      </div>

      <div className="container">

  <div className="shop-layout">

    {/* PRODUCTS */}
    <div className="products-section">
      <div className="product-grid">

        {products.map(product => (
          <div className="card" key={product.id}>
            <img src={product.image} alt={product.name} />

            <div className="card-content">
              <h3>{product.name}</h3>
              <div className="price">₹{product.price}</div>
              <button onClick={() => addToCart(product)}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}

      </div>
    </div>

    {/* CART */}
    <div className="cart-section">
      <div className="cart-title">Your Cart 🛒</div>

      {cart.length === 0 && <p>No items yet</p>}

      {cart.map((item, index) => (
        <div className="cart-item" key={index}>
          <span>{item.name}</span>
          <button onClick={() => removeFromCart(index)}>X</button>
        </div>
      ))}

      {cart.length > 0 && (
        <h3>Total: ₹{total}</h3>
      )}
    </div>

  </div>
</div>

    </>
  );
}

export default App;
