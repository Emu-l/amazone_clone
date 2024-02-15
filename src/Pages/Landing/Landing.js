import React from 'react'

import Category from "../../Components/Category/Category.js";
import CarouselEffect from '../../Components/Carousel/Carousel.js';
import LayOut from '../../Components/LayOut/LayOut.js'
import Product from '../../Components/Product/Product.js';

function Landing() {
  return (
   <LayOut>
      <CarouselEffect/>
      <Category />
      <Product/>
    </LayOut>
  );
}

export default Landing
