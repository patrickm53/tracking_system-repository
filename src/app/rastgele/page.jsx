"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import classes from "./rastgele.module.css";

const Rastgele = () => {
  const [randomBooks, setRandomBooks] = useState("");
  useEffect(() => {
    const fetchSimilarBooks = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/book`);
        if (!res.ok) {
          throw new Error("Error occurred");
        }
        const books = await res.json();
        const randomIndex = Math.floor(Math.random() * books.length);
        const selectedBook = books[randomIndex];
        setRandomBooks(selectedBook);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSimilarBooks();
  }, []);
  return (
    <div className={classes.container}>
      <Image src={randomBooks.coverImage} alt="" width={300} height={400} />
      <div className={classes.setting}>
        <button>Kitabı Ara</button>
        <button>değiştir</button>
      </div>
    </div>
  );
};

export default Rastgele;
