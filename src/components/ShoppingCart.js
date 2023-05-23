import React, { useState } from 'react';

function ShoppingCart({ cartItems, onCheckout }) {
    const [shippingAddress, setShippingAddress] = useState('');
    const [paymentInfo, setPaymentInfo] = useState('');
    const [error, setError] = useState(null);
    const handleShippingAddressChange = (e) => {
      setShippingAddress(e.target.value);
    };

    const handlePaymentInfoChange = (e) => {
      setPaymentInfo(e.target.value);
    };
    
    const cartTotal = cartItems.reduce(
        (total, item) => total + item.quantity * item.product.price, 0
      );
  
    
  
    const handleCheckout = () => {
      if (shippingAddress.trim() === '' || paymentInfo.trim() === '') {
        setError('Please fill in all fields');
        return;
      }
      setShippingAddress('');
      setPaymentInfo('');
      
      onCheckout();
    };
  
    return (
      <div>
        <h2>Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            <ul>
              {cartItems.map((item) => (
                <li key={item.product.id}>
                {item.product.name} - Quantity: {item.quantity} - Price: ${item.product.price} - Total Cost: ${item.quantity * item.product.price}
              </li>
              ))}
              <h3>Cart Value: ${cartTotal}</h3>
            </ul>
            <h3>Checkout</h3>
            <label>
              Shipping Address:
              <input
                type="text"
                value={shippingAddress}
                onChange={handleShippingAddressChange}
              />
            </label>
            <label>
              Payment Information:
              <input
                type="text"
                value={paymentInfo}
                onChange={handlePaymentInfoChange}
              />
            </label>
            <button onClick={handleCheckout}>Place Order</button>
            {error && <p style={{ fontWeight: 'bold', marginLeft: '180px'}}>{error}</p>}
          </div>
        )}
      </div>
    );
  }

  export default ShoppingCart;
