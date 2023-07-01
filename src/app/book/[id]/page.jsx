"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import classes from "./book.module.css";
import person from "../../../../public/person.jpg";
import Link from "next/link";
import StarRatings from "react-star-ratings";

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
            <div>
              <Link
                className={classes.link}
                href={`/profile/${bookDetails?.user?._id}`}
              >
                <Image
                  alt="detailProfil"
                  src={person}
                  width="30"
                  height="30"
                  className={classes.detailsProfilImage}
                />
                {bookDetails?.user?.name}
              </Link>
              <div>
                | paylaşım <span>18</span> | yorum <span>72</span>
              </div>
            </div>
          </div>
          <div className={classes.rate}>
            <StarRatings
              rating={bookDetails.rating}
              starRatedColor="#f1c40f"
              starEmptyColor="#ccc"
              starDimension="36px"
              starSpacing="5px"
            />
            <span>{bookDetails.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
