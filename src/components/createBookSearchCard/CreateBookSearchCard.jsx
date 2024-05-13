"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import classes from "./createBookSearchCard.module.css";
import { AiFillStar } from "react-icons/ai";
import colors from "../../lib/color.js";
import { useRouter } from "next/navigation";
import { ProfileImageControl } from "../imageUndefined/ImageUndefined";

const CreateBookSearchCard = ({ book }) => {
  const router = useRouter();
  const [backgroundColor, setBackgroundColor] = useState("");

  useEffect(() => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setBackgroundColor(randomColor);
  }, []);

  function formatISODate(isoDate) {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  }

  const handleBook = () => {
    console.log(book);
    router.push(`/createbook/${book?._id}`);
  };

  return (
    <div
      style={{ backgroundColor }}
      className={classes.wrapper}
      onClick={handleBook}
    >
      <ProfileImageControl
        className={classes.bookImage}
        imageName={book.bookImage}
        altImage={book?._id}
        heightImage="300"
        widthImage="200"
      />
      <div className={classes.bookDetail}>
        <div className={classes.authorDetail}>
          <h2>{book.title}</h2>
          <h3>{book.author}</h3>
        </div>
        <div className={classes.desc}>
          <ul>
            <li>
              sayfa: <span>{book.pages}</span>
            </li>
            <li>
              Yayınevi: <span>{book?.publisher}</span>
            </li>
            <li>
              Yayın Yılı: <span>{book?.years}</span>
            </li>
            <li>
              Dil: <span>{book?.language}</span>
            </li>
            {/* <li>
              Tür:{" "}
              {book?.genres.map((item) => (
                <span> {item},</span>
              ))}
            </li> */}
          </ul>
        </div>
        <div className={classes.rateLike}>
          <div className={classes.rate}>
            <AiFillStar className={classes.star} />
            <span>{book.rating}</span>
          </div>
          <div className={classes.updateDate}>
            {book.createdAt ? formatISODate(book.createdAt) : ""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBookSearchCard;
