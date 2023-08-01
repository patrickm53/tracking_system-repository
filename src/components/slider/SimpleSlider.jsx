"use client";
import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import slider1 from "../../../public/slider1.png";
import slider2 from "../../../public/slider2.png";
import slider3 from "../../../public/slider3.png";
import slider4 from "../../../public/slider4.png";
import classes from "./slider.module.css";

const SimpleSlider = () => {
  const slider = React.useRef(null);
  const settings = {
    arrows: false,
    dots: true, // Sayfalama noktalarını gösterir
    infinite: true, // Sonsuz döngü
    slidesToShow: 1, // Görünecek slayt sayısı
    slidesToScroll: 1, // Bir seferde kaydırılacak slayt sayısı
    autoPlay: true,
    autoplaySpeed: 1000,
  };

  return (
    <div className={classes.container}>
      <Slider {...settings}>
        <div>
          <Image src={slider1} width="1560" height="500" />
        </div>
        <div>
          <Image src={slider2} width="1560" height="500" />
        </div>
        <div>
          <Image src={slider3} width="1560" height="500" />
        </div>
        <div>
          <Image src={slider4} width="1560" height="500" />
        </div>
      </Slider>
    </div>
  );
};

export default SimpleSlider;
