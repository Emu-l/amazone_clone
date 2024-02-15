import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { img } from "./img/data";
import classes from "./Carousel.module.css";

const CarouselEffect = () => {
  return (
    <div className={classes.carouselRoot}>
      <Carousel
        autoplay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
        className={classes.carousel}
      >
        {img.map((imageItemLink, index) => {
          return <img key={imageItemLink} src={imageItemLink} alt={`Slide ${index}`} />;
        })}
      </Carousel>
      <div className={classes.carouselGradientOverlay}></div>
    </div>
  );
};

export default CarouselEffect;
