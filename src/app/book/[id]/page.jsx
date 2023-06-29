"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import classes from "./book.module.css";

const BookDetails = (ctx) => {
  const [bookDetails, setBookDetails] = useState("");

  const { data: session } = useSession();
  const router = useRouter;

  useEffect(() => {
    async function fetchBook() {
      const res = await fetch(
        `http://localhost:3000/api/book/${ctx.params.id}`,
        { cache: "no-store" }
      );
      const book = await res.json();

      setBookDetails(book);
    }
    session && fetchBook();
  }, [session]);

  console.log(bookDetails);

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.imgContainer}>
          <Image
            alt="bookDetailImage"
            src={bookDetails.coverImage}
            className={classes.image}
            width="250"
            height="500"
          />
          <button>Diğer Okurlar</button>
        </div>
        <div className={classes.bookDetail}>
          <h1>{bookDetails.title}</h1>
          <h3>{bookDetails.author}</h3>
          <div className={classes.bookDetailsProfil}>
            {bookDetails.user.name}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
