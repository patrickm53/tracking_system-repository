import ProductCard from "@/components/productCard/ProductCard";
import Slider from "@/components/slider/Slider";
import React from "react";
import classes from "./page.module.css";
import { books } from "../lib/data";

const Home = () => {
  return (
    <div className={classes.container}>
      <Slider />
      <div className={classes.wrapper}>
        <div className={classes.product}>
          {books?.length > 0 ? (
            books.map((book) => <ProductCard key={book._id} book={book} />)
          ) : (
            <div>kitap yok</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
