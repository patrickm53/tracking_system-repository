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
  console.log(bookDetail?.pages);
  const [page, setPage] = useState(bookDetail?.pages);
  const [language, setLanguage] = useState(bookDetail?.language);
  const [bookDate, setBookDate] = useState(bookDetail?.years);
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
          <div className={classes.bookDetailPage}>
            <div>
              <span>sayfa sayısı : </span>
              <span>Dil : </span>
              <span>Yayın Tarihi : </span>
            </div>
            <div className={classes.bilgi}>
              <input
                value={page}
                type="text"
                placeholder="Sayfa Sayısı..."
                onChange={(e) => setPage(e.target.value)}
              />
              <input
                value={language}
                type="text"
                placeholder="Dil..."
                onChange={(e) => setLanguage(e.target.value)}
              />
              <input
                value={bookDate}
                type="text"
                placeholder="Çıkış Tarihi..."
                onChange={(e) => setBookDate(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className={classes.inputContainer}></div>
      </div>
    </div>
  );
};

export default SettingsBook;
