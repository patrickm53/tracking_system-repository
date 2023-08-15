"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import classes from "./rastgele.module.css";

const Rastgele = () => {
  const [randomBooks, setRandomBooks] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);
  useEffect(() => {
    const fetchSimilarBooks = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/book`);
        if (!res.ok) {
          throw new Error("Error occurred");
        }
        if (buttonClicked === false) {
          const books = await res.json();
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
