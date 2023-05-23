import React, { useState } from 'react';
import LoginForm from './components/Login';
import ShoppingCart from './components/ShoppingCart';
import OrderHistory from './components/OrderHistory';
import ProductList from './components/ProductList';
import RegisterForm from './components/Register';
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
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [error, setError] = useState(null);

  const handleRegister = (name, email, password) => {
    const newUser = {
      name: name,
      email: email,
      password: password,
    };
  
    const existingUser = registeredUsers.find(user => user.email === email);
    if (existingUser) {
      console.log('Email already registered');
      return;
    }
  
    setRegisteredUsers([...registeredUsers, newUser]);
    setShowLoginForm(true);
    console.log('New user registered:', newUser);
  };
  

  const handleLogin = (email, password) => {

    const user = registeredUsers.find(user => user.email === email && user.password === password);
    if (user) {
      setLoggedInUser(user);
      console.log('Logged in:', user);
    } else {
      setError('Invalid email or password');
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = (product) => {
    const existingCartItem = cartItems.find((item) => 
      item.product.id === product.id
    );

    if (existingCartItem) {

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

      setCartItems([...cartItems, { product, quantity: 1 }]);
    }
  };

  

  const checkout = () => {
  
    

    
    const newOrder = {
      orderId: Math.floor(Math.random() * 1000), // Generate a random order ID
      total: calculateTotal(cartItems),
    };
    setOrderHistory([...orderHistory, newOrder]);
    console.log(orderHistory)
    setCartItems([]);
  };

  

  const calculateTotal = (cartItems) => {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity, 0
    );
  };


  return (
      <div className="App">
     <h1>Online Marketplace</h1>
      {!loggedInUser && !showLoginForm ? (
        <>
          <h1>Please Register Yourself!</h1>
          <RegisterForm onRegister={handleRegister} />
        </>
      ) : (
        <>
          {!loggedInUser && showLoginForm && (
            <>
              <h1>Login</h1>
              <LoginForm onLogin={handleLogin} />
              {error && <p style={{ fontWeight: 'bold', marginLeft: '60px'}}>{error}</p>}
            </>
          )}
          {loggedInUser && (
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
        </>
      )}
    </div>
  );
}

export default App;

