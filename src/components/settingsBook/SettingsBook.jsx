import Image from "next/image";
import React from "react";
import classes from "./settingsBook.module.css";

const SettingsBook = ({ book }) => {
  console.log(book);
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.settingsBookImageContainer}>
          <Image
            alt="settingsBookImage"
            src={book.coverImage}
            className={classes.settingsBookImage}
            width={100}
            height={100}
          />
        </div>
        <h2>{book.title}</h2>
      </div>
    </div>
  );
};

export default SettingsBook;
