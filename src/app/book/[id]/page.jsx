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
  const [similarBooks, setSimilarBooks] = useState([]);
  const [profileBooks, setProfileBooks] = useState([]);
  const [postCount, setPostCount] = useState(0);

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

  useEffect(() => {
    const fetchSimilarBooks = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/book`);
        if (!res.ok) {
          throw new Error("Error occurred");
        }
        const books = await res.json();
        const filteredBooks = books.filter(
          (book) =>
            book._id !== bookDetails?._id &&
            book.genres.some((genre) => bookDetails?.genres.includes(genre))
        );
        const randomBooks = getNRandomElements(filteredBooks, 3);
        setSimilarBooks(randomBooks);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSimilarBooks();
  }, [bookDetails]);

  useEffect(() => {
    const fetchProfileBooks = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/book/profile/${bookDetails.user._id}`,
          { cache: "no-store" }
        );
        const books = await res.json();

        const differentBooks = books.filter(
          (book) => book._id !== bookDetails?._id
        );

        const filteredBooks = differentBooks.slice(0, 3);

        setProfileBooks(filteredBooks);
        setPostCount(books.length);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfileBooks();
  }, [bookDetails]);

  const getNRandomElements = (arr, n) => {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  };

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
          <button className={classes.button1}>Diğer Okurlar</button>
          <button className={classes.button2}>Yorum Paylaş</button>
          <div className={classes.bookSayfa}>
            <div>
              <span>sayfa sayısı : </span>
              <span>Dil : </span>
              <span>Yayın Tarihi : </span>
            </div>
            <div className={classes.bilgi}>
              <span>{bookDetails.pages}</span>
              <span>{bookDetails.language}</span>
              <span>{bookDetails.years}</span>
            </div>
          </div>
        </div>
        <div className={classes.bookDetail}>
          <h1>{bookDetails.title}</h1>
          <div className={classes.authorStar}>
            <h3>{bookDetails.author}</h3>
            <div className={classes.rate}>
              <StarRatings
                rating={bookDetails.rating}
                starRatedColor="#f1c40f"
                starEmptyColor="#ccc"
                starDimension="18px"
                starSpacing="1px"
              />
              <span>{bookDetails.rating}</span>
            </div>
          </div>
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
                - paylaşım <span>{postCount}</span> - yorum <span>72</span>
              </div>
            </div>
          </div>
          <div
            className={classes.desc}
            dangerouslySetInnerHTML={{ __html: bookDetails.description }}
          />

          <div className={classes.tür}>
            tür :
            {bookDetails?.genres?.map((genre, index) => (
              <span key={index}>{genre}</span>
            ))}
          </div>
          {similarBooks.length > 0 && (
            <>
              <div className={classes.similar}>
                <h2>Benzer Türde Kitaplar</h2>
                <ul>
                  {similarBooks.map((book) => (
                    <li key={book._id}>
                      <Link className={classes.link} href={`/book/${book._id}`}>
                        <div className={classes.imgSimilarContainer}>
                          <Image
                            alt="book._id"
                            src={book.coverImage}
                            width="150"
                            height="300"
                            className={classes.image}
                          />
                        </div>
                      </Link>
                      <h2>{book.title}</h2>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
          {profileBooks.length > 0 && (
            <>
              <div className={classes.similar}>
                <h2>Kullanıcının Diğer Kitapları</h2>
                <ul>
                  {profileBooks.map((book) => (
                    <li key={book._id}>
                      <Link className={classes.link} href={`/book/${book._id}`}>
                        <div className={classes.imgSimilarContainer}>
                          <Image
                            alt="book._id"
                            src={book.coverImage}
                            width="150"
                            height="300"
                            className={classes.image}
                          />
                        </div>
                      </Link>
                      <h2>{book.title}</h2>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
