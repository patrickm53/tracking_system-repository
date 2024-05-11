import Image from "next/image";
import React from "react";
import classes from "./settingsBook.module.css";
import { AiFillStar, AiFillLike } from "react-icons/ai";
import Link from "next/link";
import { ProfileImageControl } from "../imageUndefined/ImageUndefined";

const SettingsBook = ({ book }) => {
  let date = new Date(book.createdAt);
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let lastDate = day + "/" + month + "/" + year;
  return (
    <div className={classes.wrapper}>
      <div className={classes.settingsBookImageContainer}>
        <ProfileImageControl
          altImage="settingsBookImage"
          imageName={book.bookImage}
          className={classes.settingsBookImage}
          widthImage="70"
          heightImage="105"
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
