import React, { useState } from 'react';
import LoginForm from './components/Login';
import ShoppingCart from './components/ShoppingCart';
import OrderHistory from './components/OrderHistory';
import ProductList from './components/ProductList';
// Dummy data
const products = [
  { id: '1', name: 'Apple', price: 10, seller: 'Ram' },
  { id: '2', name: 'Mango', price: 30, seller: 'Sundar' },
  { id: '3', name: 'Banana', price: 20, seller: 'Sundar' },
  { id: '4', name: 'Grapes', price: 50, seller: 'Sahil' },
  { id: '5', name: 'Lichi', price: 100, seller: 'Sahil' },
  { id: '6', name: 'Dragon Fruit', price: 60, seller: 'Ram' },
  { id: '7', name: 'Cheeku', price: 90, seller: 'Shyam' },
  { id: '8', name: 'Coconut', price: 70, seller: 'Shyam' },
];


function App() {
  const [loggedInUser, setLoggedInUser] = useState(null); 
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  

  const handleLogin = (user) => {
    setLoggedInUser(user);
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  
  
  const handleRegister = (name, email, password) => {
    // Perform validation and store the new user in the system
    // Replace with your implementation logic
    
    // Create a new user object
    const newUser = {
      name: name,
      email: email,
      password: password,
      // Add other relevant user information if needed
    };
  
    // Perform validation of the user's registration details
    // ...
  
    // Store the new user in the system
    // ...
  
    console.log('New user registered:', newUser);
  };
  
  

  

  const addToCart = (product) => {
    const existingCartItem = cartItems.find((item) => 
      item.product.id === product.id
    );

    if (existingCartItem) {
      // If the product is already in the cart, update the quantity
      const updatedCartItems = cartItems.map((item) => {
        if (item.product.id === product.id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });
      setCartItems(updatedCartItems);
    } else {
      // If the product is not in the cart, add it with quantity 1
      setCartItems([...cartItems, { product, quantity: 1 }]);
    }
  };

  

  const checkout = () => {
    // Perform checkout process
    // ...

    // Clear the cart
    setCartItems([]);

    // Update the order history
    const newOrder = {
      orderId: Math.floor(Math.random() * 1000), // Generate a random order ID
      total: calculateTotal(cartItems),
    };
    setOrderHistory([...orderHistory, newOrder]);
  };

  

  const calculateTotal = (cartItems) => {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  return (
    <div className="App">
      <h1>Online Marketplace</h1>
      {!loggedInUser ? (
        <LoginForm onLogin={handleLogin} onRegister={handleRegister} />
      ) : (
        <>
          <h2>Welcome, {loggedInUser.email}!</h2>
            <input
          type="text"
          value={searchQuery}
          onChange={handleSearchInputChange}
          placeholder="Search by product name"
          style={{ fontSize: '18px', padding: '8px', width: '200px', height:  '5px' }}
        />
        <ProductList
          products={filteredProducts}
          handleAddToCart={addToCart}
        />
          <ShoppingCart
            cartItems={cartItems}
            onCheckout={checkout}
          />
          <OrderHistory orderHistory={orderHistory} />
        </>
      )}
    </div>
  );
}

export default App;

