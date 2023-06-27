"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import classes from "./book.module.css";

const BookDetails = (ctx) => {
  const [bookDetails, setBookDetails] = useState("");

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

  return <div>{bookDetails.title}</div>;
};

export default BookDetails;
