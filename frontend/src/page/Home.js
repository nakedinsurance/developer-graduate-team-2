import React, { useEffect, useState } from "react";

const fetchProductsAndSet =  async ({setProducts}) => {
    try {
        const response = await fetch('http://localhost:4280/products' , {
            method : "GET", 
            headers: {
                'Content-Type': "application/json"
            }
        })
    }
    catch (e) {

    }
} 

export const Home = () => {
  const [products, setProducts] = useState([]);



  useEffect(()=> {

  },[])
  return <div></div>;
};
