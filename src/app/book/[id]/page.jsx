"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import classes from "./book.module.css";
import person from "../../../../public/person.jpg";
import { AiFillStar } from "react-icons/ai";

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
          <button>Yorumunu Paylaş</button>
        </div>
        <div className={classes.bookDetail}>
          <h1>{bookDetails.title}</h1>
          <h3>{bookDetails.author}</h3>
          <div className={classes.bookDetailsProfil}>
            <Image
              alt="detailProfil"
              src={person}
              width="45"
              height="45"
              className={classes.detailsProfilImage}
            />
            {bookDetails?.user?.name}
          </div>
          <div className={classes.rate}>
            <AiFillStar />
            <span>{bookDetails.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
