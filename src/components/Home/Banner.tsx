import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "../Home/banner.scss"
const Carousel = styled.div`
  width: 1519.5px;
  height: 500px;
  margin-left: -90px;
  background-color: #b0ffd1;
  margin-bottom: 30px;
  display: flex;

  .a {
    width: 500px;
    height: 200px;
    background-color: #d83232;
  }

  /* .slick-track{
        width: 100%;
        display: flex;

        div{
            width: 100%;
        }
    } */
`;
export default function Banner() {
  const settings = {
    dots: true,
    infinite: true,  
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 300,
    autoplaySpeed: 5000,
    cssEase: "linear",
  };
  return (
    <Slider className="carousel" {...settings}>
      <div className="a"><img src="https://cdn2.vectorstock.com/i/1000x1000/23/21/online-tutor-concept-banner-header-vector-24192321.jpg" alt="" /></div>
      <div className="a"><img src="https://cdn4.vectorstock.com/i/1000x1000/04/38/contact-center-concept-banner-header-vector-23590438.jpg" alt="" /></div>
    </Slider>
  );
}
