"use client";
import ProductCard from "@/components/productCard/ProductCard";
import SimpleSlider from "@/components/slider/SimpleSlider";
import React, { useEffect, useState } from "react";
import classes from "./page.module.css";
import { fetchProfilesAll, getBook } from "./api";

const Home = () => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    async function fetchBooks() {
      const book = await getBook();

      setBooks(book);
    }
    fetchBooks();
  }, []);
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
