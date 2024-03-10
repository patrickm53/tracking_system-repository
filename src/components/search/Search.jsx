import Image from "next/image";
import React, { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import classes from "./search.module.css";
import { useRouter } from "next/navigation";
import { fetchSearchCreateBook, fetchSearchUser } from "@/app/api";
import { ProfileImageControl } from "../imageUndefined/ImageUndefined";

const Search = () => {
  const [searchUserTerm, setSearchUserTerm] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearchBook, setDebouncedSearchBook] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (search?.length < 3) {
      setSearchTerm([]);
      setSearchUserTerm([]);
      setDebouncedSearchBook("");
      return;
    }
    const timeoutId = setTimeout(() => {
      setDebouncedSearchBook(search);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [search]);

  useEffect(() => {
    async function searchControl() {
      const books = await fetchSearchCreateBook(debouncedSearchBook);
      const users = await fetchSearchUser(debouncedSearchBook);
      setSearchTerm(books);
      let similarUsers = [];
      if (users !== "dont") similarUsers = users.slice(0, 3);
      else if (users === "dont") similarUsers = "dont";
      setSearchUserTerm(similarUsers);
    }

    if (debouncedSearchBook.length > 2) {
      searchControl();
    }
  }, [debouncedSearchBook]);

  const onSearch = (event) => {
    event.preventDefault();
    router.push(`/search?q=${search}`);
    setSearch("");
  };

  return (
    <div className={classes.container}>
      <div className={classes.search}>
        <form onSubmit={onSearch}>
          <input
            type="text"
            value={search}
            placeholder="Ara..."
            onChange={(event) => setSearch(event.target.value)}
          />
        </form>
        <AiOutlineSearch className={classes.icons} />
      </div>
      {((searchTerm.length > 0 && searchTerm !== "dont") ||
        (searchUserTerm.length > 0 && searchUserTerm !== "dont")) && (
        <div className={classes.searchBox}>
          {searchUserTerm.length > 0 && searchUserTerm !== "dont" && (
            <div>
              {searchUserTerm.map((user) => (
                <div key={user?._id} className={classes.searchUser}>
                  <ProfileImageControl
                    key={user?._id}
                    altImage={user._id}
                    imageName={user?.profilImage}
                    widthImage="50"
                    heightImage="50"
                    className={classes.searchUserImage}
                  />
                  <span>
                    <h2>{user.name}</h2>
                    <h3>{user.username}</h3>
                  </span>
                </div>
              ))}
            </div>
          )}
          {searchTerm.length > 0 && searchTerm !== "dont" && (
            <div>
              {searchTerm.map((book) => (
                <div key={book?._id} className={classes.searchBook}>
                  <Image
                    alt={book?._id}
                    src={book.coverImage}
                    width="50"
                    height="80"
                  />
                  <span>
                    <h2>{book.title}</h2>
                    <h3>{book.author}</h3>
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
