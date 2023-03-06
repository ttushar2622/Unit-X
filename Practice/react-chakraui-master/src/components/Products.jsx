import React,{useEffect,useState} from "react";
import {Flex,Grid} from "@chakra-ui/react";
import axios from "axios";

import Product from "./Product";
import AddProduct from "./AddProduct";
import Pagination from "./Pagination";

const getProducts  = async (pageNumber,limit)=>{
  return axios.get(`http://localhost:8080/products?_page=${pageNumber}&_limit=${limit}`);
};

const Products = () => {

  const [pageFilter,setPageFilter]=useState({
    pageNumber:1,
    limit:3,
    totalCount:0,
  });
  const [products,setProducts]=useState([]);
  const {pageNumber,limit}=pageFilter;

  const handleOnAdd = (body)=>{
    axios.post("http://localhost:8080/products",body).then(()=>{
      getProducts(pageNumber,limit).then((res)=>{
        setPageFilter({
          ...pageFilter,
          totalCount:Number(res.headers["X-total-count"]),
        });
        setProducts(res.data);
      });
    });
  };

  useEffect(()=>{
    getProducts(pageNumber,limit).then((res)=>{
      setPageFilter({
        ...pageFilter,
        totalCount:Number(res.headers["X-total-count"]),
      });
      setProducts(res.data);
    });
  },[pageNumber,limit]);

  const updatePageFilter=(change)=>{
    setPageFilter({
      ...pageFilter,
      ...change,
    });
  };
  // TODO: Remove below const and instead import them from chakra
  // const Flex = () => <div />;
  // const Grid = () => <div />;

  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <AddProduct add={handleOnAdd}/>
      <Grid>{products.map((p)=>(
        <Product key={p.id} {...p}/>
      ))}</Grid>
      <Pagination pageFilter={pageFilter} updatePageFilter={updatePageFilter}/>
    </Flex>
  );
};

export default Products;
