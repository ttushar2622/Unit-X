import React from 'react';

const ProductItem = ({ product }) => (
  <div className="product-item">
    <img src={product.image} alt={product.title} />
    <h3>{product.title}</h3>
    <p>Price: ${product.price}</p>
    <h3>Rating: {product.rating.rate}</h3>
  </div>
);

export default ProductItem;
