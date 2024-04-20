"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import classes from "./create-book.module.css";
import "react-quill/dist/quill.snow.css";
import { GrSearch } from "react-icons/gr";
import Image from "next/image";
import { AiFillPlusCircle } from "react-icons/ai";
import { fetchSearchCreateBook } from "../api";
import PulseLoader from "react-spinners/PulseLoader";
import dynamic from "next/dynamic";
import ProductCard from "@/components/productCard/ProductCard";
import CreateBookSearchCard from "@/components/createBookSearchCard/CreateBookSearchCard";
import Link from "next/link";

const CreateBook = () => {
  const router = useRouter();
  const [debouncedSearchBook, setDebouncedSearchBook] = useState("");
  const [searchBook, setSearchBook] = useState("");
  const [resultBooks, setResultBooks] = useState([]);

  const handleNewBookNavigate = () => {
    router.push("/createbook/new");
  };

  useEffect(() => {
    if (searchBook?.length < 3) {
      setResultBooks([]);
      setDebouncedSearchBook("");
      return;
    }
    const timeoutId = setTimeout(() => {
      setDebouncedSearchBook(searchBook);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchBook]);

  useEffect(() => {
    if (debouncedSearchBook.length > 2) {
      async function fetchSearchBooks() {
        const book = await fetchSearchCreateBook(debouncedSearchBook);
        setResultBooks(book);
      }
      if (debouncedSearchBook.length > 2) {
        fetchSearchBooks();
      }
    }
  }, [debouncedSearchBook]);

  return (
    <div className={classes.container}>
      <h2>Kitap Ara</h2>
      <div className={classes.wrapper}>
        <div className={classes.searchBox}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <GrSearch />
            </div>
            <input
              type="text"
              onChange={(e) => setSearchBook(e.target.value)}
              placeholder="Kitabı Ara"
            />
          </div>
          {resultBooks.length > 0 && resultBooks !== "dont" ? (
            <div className={classes.searchBooks}>
              <div className={classes.newBook} onClick={handleNewBookNavigate}>
                <AiFillPlusCircle />
                Yeni Kitap Oluştur
              </div>
              {resultBooks.map((book) => (
                <CreateBookSearchCard key={book._id} book={book} />
              ))}
            </div>
          ) : resultBooks === "dont" ? (
            <div className={classes.bookControlWarning}>
              <div className={classes.newBook} onClick={handleNewBookNavigate}>
                <AiFillPlusCircle />
                Yeni Kitap Oluştur
              </div>
            </div>
          ) : searchBook.length < 3 ? (
            <></>
          ) : (
            <div className={classes.bookControlWarning}>
              <PulseLoader size={20} color={"#bababa"} loading={true} />
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreateBook;
