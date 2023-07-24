import React from "react";
import classes from "./populer.module.css";
import ProductCard from "@/components/productCard/ProductCard";

export async function fetchBooks() {
  const res = await fetch("http://localhost:3000/api/book", {
    cache: "no-store",
  });

  return res.json();
}

const Populer = async () => {
  const books = await fetchBooks();
  return (
    <div className={classes.container}>
      <div className={classes.filter}>filter</div>
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

export default Populer;
