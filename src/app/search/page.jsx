"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/productCard/ProductCard";
import classes from "./search.module.css";
import { getBook, fetchAllProfile } from "../api";
import ProfileCard from "@/components/profileCard/ProfileCard";
import { useSession } from "next-auth/react";

const SearchPage = () => {
  const { data: session } = useSession();
  const [isUserChecked, setIsUserChecked] = useState(true);
  const [isBookChecked, setIsBookChecked] = useState(true);
  const [searchBook, setSearchBook] = useState([]);
  const [searchUser, setSearchUser] = useState([]);
  const search = useSearchParams();
  const searchQuery = search ? search.get("q") : null;

  useEffect(() => {
    async function searchControl() {
      const books = await getBook();
      const profile = await fetchAllProfile();

      const searchProfile = profile.filter((user) =>
        user.username.toLowerCase().includes(searchQuery)
      );
      const searchResult = books.filter((book) =>
        book.title.toLowerCase().includes(searchQuery)
      );

      if (isUserChecked) {
        setSearchUser(searchProfile);
      } else {
        setSearchUser("");
      }

      if (isBookChecked) {
        setSearchBook(searchResult);
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
        {searchUser.length > 0
          ? searchUser.map((user) => <ProfileCard key={user._id} user={user} />)
          : ""}
        {searchBook.length > 0
          ? searchBook.map((book) => <ProductCard key={book._id} book={book} />)
          : ""}
      </div>
    </div>
  );
};

export default SearchPage;
