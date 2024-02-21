"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/productCard/ProductCard";
import classes from "./search.module.css";
import {
  getBook,
  fetchAllProfile,
  fetchSearchBook,
  fetchSearchUser,
} from "../api";
import ProfileCard from "@/components/profileCard/ProfileCard";

const SearchPage = () => {
  const [isUserChecked, setIsUserChecked] = useState(true);
  const [isBookChecked, setIsBookChecked] = useState(true);
  const [searchBook, setSearchBook] = useState([]);
  const [searchUser, setSearchUser] = useState([]);
  const search = useSearchParams();
  const searchQuery = search ? search.get("q") : null;

  useEffect(() => {
    async function searchControl() {
      const books = await fetchSearchBook(searchQuery);
      const users = await fetchSearchUser(searchQuery);

      if (isUserChecked) {
        setSearchUser(users);
      } else {
        setSearchUser("");
      }

      if (isBookChecked) {
        setSearchBook(books);
      } else {
        setSearchBook("");
      }
    }

    searchControl();
  }, [searchQuery, isUserChecked, isBookChecked]);

  const handleUserCheckboxChange = () => {
    setIsUserChecked(!isUserChecked);
  };

  const handleBookCheckboxChange = () => {
    setIsBookChecked(!isBookChecked);
  };

  return (
    <div className={classes.container}>
      <h2>{searchQuery}</h2>
      <div className={classes.inputContainer}>
        <input
          type="checkbox"
          checked={isUserChecked}
          onChange={handleUserCheckboxChange}
        />
        <p>Kullanıcılar</p>
        <input
          type="checkbox"
          checked={isBookChecked}
          onChange={handleBookCheckboxChange}
        />
        <p>Kitaplar</p>
      </div>
      <div className={classes.wrapper}>
        {searchUser.length > 0 && searchUser !== "dont"
          ? searchUser.map((user) => (
              <ProfileCard key={user._id} id={user._id} user={user} />
            ))
          : searchUser === "dont"
          ? ""
          : "loading"}
        {searchBook.length > 0 && searchBook !== "dont"
          ? searchBook.map((book) => <ProductCard key={book._id} book={book} />)
          : searchBook === "dont"
          ? ""
          : "loading"}
      </div>
    </div>
  );
};

export default SearchPage;
