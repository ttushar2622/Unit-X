import React, { useState, useEffect } from 'react';
import ProductItem from './ProductItem';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); 

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

  return (
    <div className="product-list">
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      />
      <div className="sort-buttons">
        <button onClick={() => setSortOrder('asc')}>Sort by Price (Low to High)</button>
        <button onClick={() => setSortOrder('desc')}>Sort by Price (High to Low)</button>
      </div>
      <div className="products">
        {sortedProducts.map(product => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
