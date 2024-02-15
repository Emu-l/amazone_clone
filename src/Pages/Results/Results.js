import React, { useEffect, useState } from "react";
import Classes from "./Results.module.css";
import LayOut from "../../Components/LayOut/LayOut.js";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Components/Api/endpoint.js";
import Loader from "../../Components/Loader/Loader.js";
import ProductCard from "../../Components/Product/ProductCard.js";

function Results() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Set to true initially
  const { categoryName } = useParams();

  useEffect(() => {
    setIsLoading(true); // Set loading state to true when component mounts
    axios
      .get(`${productUrl}/products/category/${categoryName}`)
      .then((res) => {
        setResults(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [categoryName]); // Include categoryName in dependency array

  return (
    <LayOut>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>Category / {categoryName}</p>
        <hr />

        {isLoading ? (
          <Loader />
        ) : (
          <div className={Classes.products_container}>
            {results?.map((product) => (
              <ProductCard
                key={product.id}
                renderAdd={true}
                product={product}
                flex={true}
              />
            ))}
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Results;
