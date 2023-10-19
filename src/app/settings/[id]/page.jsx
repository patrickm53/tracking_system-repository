"use client";
import React, { useEffect, useState } from "react";
import { fetchBookId } from "@/app/api";

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
  return <div>{bookDetail?.title}</div>;
};

export default SettingsBook;
