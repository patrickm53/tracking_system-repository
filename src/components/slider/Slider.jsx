import Image from "next/image";
import React from "react";
import classes from "./slider.module.css";
import slider from "../../../public/slider.png";

const Slider = () => {
  return (
    <div className={classes.container}>
      <Image alt="slider" src={slider} className={classes.image} width="100%" />
    </div>
  );
};

export default Slider;
