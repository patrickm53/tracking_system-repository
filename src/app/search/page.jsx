"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/productCard/ProductCard";
import classes from "./search.module.css";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState([]);
  const search = useSearchParams();
  const searchQuery = search ? search.get("q") : null;

  useEffect(() => {
    async function searchControl() {
      const res = await fetch(`http://localhost:3000/api/book`);
      if (!res.ok) {
        throw new Error("Error occurred");
      }

      const books = await res.json();

      const searchResult = books.filter((book) =>
        book.title.toLowerCase().includes(searchQuery)
      );

      setSearchTerm(searchResult);
    }

    searchControl();
  }, [searchQuery]);

  console.log("Search Params", searchQuery);

  return (
    <div className={classes.container}>
      <h2>{searchQuery}</h2>
      <div className={classes.wrapper}>
        {searchTerm.length > 0 ? (
          searchTerm.map((book) => <ProductCard key={book._id} book={book} />)
        ) : (
          <div>Kitap Bulunamadı</div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
