"use client";
import React, { useState, useEffect } from "react";
import classes from "./productCard.module.css";
import Link from "next/link";
import Image from "next/image";
import person from "../../../public/person.jpg";
import { AiOutlineLike, AiFillStar } from "react-icons/ai";
import colors from "../../lib/color.js";

const ProductCard = ({ key, book }) => {
  const [backgroundColor, setBackgroundColor] = useState("");

  useEffect(() => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setBackgroundColor(randomColor);
  }, []);
  return (
    <div className={classes.body}>
      <div className={classes.container}>
        <div className={classes.person}>
          <Image
            alt="person"
            src={person}
            width="32"
            height="32"
            className={classes.personImg}
          />
          <Link href={`/profile/${book.user._id}`}>
            <h2 className={classes.uploader}>{book.user.name}</h2>
          </Link>
          <span>•</span>
          <div className={classes.clock}>3s</div>
          <span>•</span>
          <button className={classes.followers}>Takip Et</button>
        </div>
        <div style={{ backgroundColor }} className={classes.wrapper}>
          <Link className={classes.imgContainer} href={`/book/${book._id}`}>
            <Image
              className={classes.bookImage}
              src={book.coverImage}
              alt="book"
              height="220"
              width="155"
            />
          </Link>
          <div className={classes.bookDetail}>
            <div className={classes.authorDetail}>
              <h2>{book.title}</h2>
              <h3>{book.author}</h3>
            </div>
            <p>{book.description}</p>
            <div className={classes.rateLike}>
              <div className={classes.rate}>
                <AiFillStar className={classes.star} />
                <span>{book.rating}</span>
              </div>
              <div className={classes.like}>
                <AiOutlineLike className={classes.likeIcon} />
                <span>100</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
