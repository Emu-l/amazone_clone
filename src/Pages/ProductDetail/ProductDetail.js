import React, { useEffect, useState } from "react";
import classes from "./ProductDetail.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Components/Api/endpoint";
import Loader from "../../Components/Loader/Loader";
import ProductCard from "../../Components/Product/ProductCard";

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${productUrl}/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [productId]); // Include productId in the dependency array
  return (
    <LayOut>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={classes.product_detail}>
          <img src={product.image} alt={product.title} />
          <div className={classes.product_info}>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>Product Price: ${product.price}</p>
            <p>Product Rating: {product.rating?.rate}</p>
            <p>Rating Count: {product.rating?.count}</p>

            <button>Add to Cart</button>
          </div>
        </div>
      )}
    </LayOut>
  );
}

export default ProductDetail;
