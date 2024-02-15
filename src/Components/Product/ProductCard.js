import React, { useContext } from "react";
import classes from "./Product.module.css";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import ProductDetail from "../../Pages/ProductDetail/ProductDetail";
import { DataContext } from "../DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";

function ProductCard({ product, showDescription , flex, rendAdd}) {
  const { id, image, title, price, rating, description } = product;

  const [state, dispatch] = useContext(DataContext);

  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: {
        id,
        image,
        title,
        price,
        rating,
        description,
      },
    });
  };

  return (
    <div className={classes.product_card}>
      <Link to={`/products/${id}`} className={classes.link}>
        <img src={image} alt="" className={classes.img_container} />
      </Link>
      <div className={classes.product_info}>
        <h4>{title}</h4>
        {showDescription && <p>{description}</p>}
        <div>
          <Rating name="size-medium" defaultValue={2} />
        </div>
        <div>
          <p style={{ marginLeft: "10px" }}>${price}</p>
        </div>
        {rendAdd && (
          <button  className={classes.button} onClick={addToCart}>
            add to cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
