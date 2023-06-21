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
          <Link href="/profil">
            <h2 className={classes.uploader}>{book.yukleyen}</h2>
          </Link>
          <span>•</span>
          <div className={classes.clock}>{book.saat}</div>
          <span>•</span>
          <button className={classes.followers}>Takip Et</button>
        </div>
        <div style={{ backgroundColor }} className={classes.wrapper}>
          <Link className={classes.imgContainer} href={`/book/${book._id}`}>
            <Image
              className={classes.bookImage}
              src={book.resim}
              alt="book"
              height="220"
              width="155"
            />
          </Link>
          <div className={classes.bookDetail}>
            <div className={classes.authorDetail}>
              <h2>{book.kitap_ismi}</h2>
              <h3>{book.yazar}</h3>
            </div>
            <p>{book.aciklama}</p>
            <div className={classes.rateLike}>
              <div className={classes.rate}>
                <AiFillStar className={classes.star} />
                <span>{book.puan}</span>
              </div>
              <div className={classes.like}>
                <AiOutlineLike className={classes.likeIcon} />
                <span>{book.begeni_sayisi}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
