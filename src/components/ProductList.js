import React, { useState } from 'react';

function ProductList({ products, handleAddToCart }) {
  // const [searchQuery] = useState('');

  

  // // Filter products based on search query
  // const filteredProducts = products.filter((product) => {
  //   console.log(searchQuery.toLowerCase());
  //   return product.name.toLowerCase().includes(searchQuery.toLowerCase());
  // });

  return (
    <div>
      <h2>Products</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {products.map((product) => (
          <div key={product.id}
          style={{
            width: '300px',
            marginBottom: '20px',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '10px',
            textAlign: 'center',
          }}
          >
            <h3>Name: {product.name}</h3>
            <p>Price: ${product.price}</p>
            <p>Seller: {product.seller}</p>
            <button onClick={() => handleAddToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
