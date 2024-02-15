import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import Loader from "../Loader/Loader";
import classes from './Product.module.css'

function Product() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        console.log("Data:", res.data);
        setProducts(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("Error:", err);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className={classes.product_container}>
          {products.map((product) => (
            <ProductCard rendAdd={true} key={product.id} product={product} />
          ))}
        </section>
      )}
    </>
  );
}

export default Product;
