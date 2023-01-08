import React from "react";
import ProductItem from "./ProductItem";

const ProductList = ({products=[]}) => {
  return <div data-testid="products-container">
    {products.map((element) => (
    <ProductItem key={element.id} {...element}></ProductItem>
  ))}
  </div>;
};

export default ProductList;