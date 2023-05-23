import React from 'react';

function OrderHistory({ orderHistory }) {
    return (
      <div>
        <h2>Order History</h2>
        {orderHistory.length === 0 ? (
          <p>No orders found</p>
        ) : (
          <ul>
            {orderHistory.map((order) => (
              <li key={order.orderId}>
                Order ID: {order.orderId}, Total Cost: ${order.total}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
  export default OrderHistory;
