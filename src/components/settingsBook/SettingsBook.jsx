import Image from "next/image";
import React from "react";
import classes from "./settingsBook.module.css";
import { AiFillStar, AiFillLike } from "react-icons/ai";

const SettingsBook = ({ book }) => {
  console.log(book);
  let date = new Date(book.createdAt);
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let lastDate = day + "/" + month + "/" + year;
  return (
    <div className={classes.wrapper}>
      <div className={classes.settingsBookImageContainer}>
        <Image
          alt="settingsBookImage"
          src={book.coverImage}
          className={classes.settingsBookImage}
          width={70}
          height={100}
        />
      </div>
      <div className={classes.settingsBookInformation}>
        <div className={classes.settingsBookInfo}>
          <h2>{book.title}</h2>
          <h4>{book.author}</h4>
          <h5>{lastDate}</h5>
        </div>
        <div className={classes.settingsBookStarAndLike}>
          <div className={classes.settingsBookStar}>
            <AiFillStar className={classes.settingsStar} />
            <span>{book.rating}</span>
          </div>
          <div className={classes.settingsBookLike}>
            <AiFillLike className={classes.settingsLike} />
            <span>{book.likes.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsBook;
