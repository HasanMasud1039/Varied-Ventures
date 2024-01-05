// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Cart from './components/Cart';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [token, setToken] = useState('');
  const [user, setUser] = useState('');
  const [cart, setCart] = useState([]);
  const addToCart = (product) => {
    const isProductInCart = cart.some((item) => item.id === product.id);
    if (isProductInCart) {
      toast.error('This product is already in your cart!')
    } else {
      toast.success('Successfully added to cart!')
      setCart((prevCart) => [...prevCart, product]);
    }
  };
  const removeFromCart = (index) => {
    setCart((prevCart) => {
      const newCart = [...prevCart];
      newCart.splice(index, 1);
      return newCart;
    });
    toast.success('Successfully Removed From Cart!')
  }
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<Login setToken={setToken} setUser={setUser} />}
        />

        <Route
          path="/"
          element={
            <Home
              token={token}
              user={user}
              setUser={setUser}
              cart={cart}
              addToCart={addToCart}
            />
          }
        />

        <Route
          path="/cart"
          element={<Cart cart={cart} user={user} removeFromCart={removeFromCart} />}
        />
      </Routes>
      <Toaster
        position="top-right"
        reverseOrder
        containerStyle={{ padding: '10px', fontSize: '18px' }}
        containerClassName="custom-toast-container"
        toastClassName="custom-toast"
        toastOptions={{ duration: 2000, style: { background: '' } }}
      />
    </Router>
  );
}

export default App;
