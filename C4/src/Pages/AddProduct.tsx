import React from "react";
import { Navbar } from "../Components/Navbar";
import { useState } from "react";
import axios from "axios";



export const AddProduct = () => {
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [price, setPrice] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const obj = {
      name: "",
      brand: "",
      price: 0,
      image: "",
      like: 0,
      dislike: 0,
    };
    axios
      .post(
        `http://localhost:${process.env.REACT_APP_JSON_SERVER_PORT}/products`,
        obj
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Navbar pageName="Add Product Page" />
      <form onSubmit={handleSubmit}>
        {/* Add all fields here to take product input */}
        <input
          type="text"
          className="product-name"
          value={name}
          placeholder="Product Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          className="product-image"
          value={image}
          placeholder="Product Image"
          onChange={(e) => setImage(e.target.value)}
        />
        <input
          type="text"
          className="product-brand"
          value={brand}
          placeholder="Product Brand"
          onChange={(e) => setBrand(e.target.value)}
        />
        <input
          type="text"
          className="product-price"
          value={price}
          placeholder="Product Price"
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <button type="submit" className="submit-form">
          Add Product
        </button>
      </form>
    </div>
  );
};