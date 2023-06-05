import ProductCard from "@/components/productCard/ProductCard";
import React from "react";
import classes from "./page.module.css";

const Home = () => {
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <ProductCard />
      </div>
    </div>
  );
};

export default Home;
