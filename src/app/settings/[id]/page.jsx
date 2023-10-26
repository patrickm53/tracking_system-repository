"use client";
import React, { useEffect, useState } from "react";
import { fetchBookId } from "@/app/api";
import classes from "./settingsBook.module.css";
import Image from "next/image";

const SettingsBook = (ctx) => {
  const [bookDetail, setBookDetail] = useState();
  useEffect(() => {
    async function fecthBook() {
      const id = ctx.params.id;
      const data = await fetchBookId(id);
      setBookDetail(data);
    }
    fecthBook();
  }, []);
  console.log(bookDetail);
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.imgContainer}>
          <Image
            alt="settingsBookImage"
            src={bookDetail?.coverImage}
            width={200}
            height={400}
            className={classes.coverImage}
          />
          <button className={classes.buttonGreen}>Resim Seç</button>
          <button>Resim Yükle</button>
        </div>
        <div className={classes.inputContainer}></div>
      </div>
    </div>
  );
};

export default SettingsBook;
