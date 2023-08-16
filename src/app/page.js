import ProductCard from "@/components/productCard/ProductCard";
import SimpleSlider from "@/components/slider/SimpleSlider";
import React from "react";
import classes from "./page.module.css";

export async function fetchBooks() {
  const res = await fetch("http://localhost:3000/api/book?page", {
    cache: "no-store",
  });

  return res.json();
}

const Home = async () => {
  const books = await fetchBooks();
  return (
    <div className={classes.container}>
      <SimpleSlider />
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
