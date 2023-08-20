"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import classes from "./rastgele.module.css";
import { getBook } from "../api";

const Rastgele = () => {
  const [randomBooks, setRandomBooks] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);
  useEffect(() => {
    const fetchSimilarBooks = async () => {
      try {
        if (buttonClicked === false) {
          const books = await getBook();
          const randomIndex = Math.floor(Math.random() * books.length);
          const selectedBook = books[randomIndex];
          setRandomBooks(selectedBook);
        }
      } catch (error) {
        console.log(error);
      }
    };
    setButtonClicked(false);
    fetchSimilarBooks();
  }, [buttonClicked]);

  const handleButtonClick = () => {
    setButtonClicked(true);
  };

  return (
    <div className={classes.container}>
      <Image src={randomBooks.coverImage} alt="" width={300} height={400} />
      <div className={classes.setting}>
        <Link href={`/search?q=${randomBooks.title?.toLowerCase()}`}>
          <button className={classes.bookSearch}>Kitabı Ara</button>
        </Link>
        <button onClick={handleButtonClick} className={classes.bookChange}>
          değiştir
        </button>
      </div>
    </div>
  );
};

export default Rastgele;
