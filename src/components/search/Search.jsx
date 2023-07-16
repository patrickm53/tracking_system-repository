import Image from "next/image";
import React, { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import classes from "./search.module.css";
import { useRouter } from "next/navigation";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState([]);
  const [search, setSearch] = useState("");

  const router = useRouter();

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    async function searchControl() {
      const res = await fetch(`http://localhost:3000/api/book`);
      if (!res.ok) {
        throw new Error("Error occurred");
      }

      const books = await res.json();

      const searchResult = books.filter((book) =>
        book.title.toLowerCase().includes(search)
      );

      const similarSearch = searchResult.slice(0, 3);

      setSearchTerm(similarSearch);
    }

    searchControl();
  }, [search]);

  const handleArama = () => {
    router.push(`/arama?search=${search}`);
    setSearch("");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleArama();
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.search}>
        <input
          type="text"
          value={search}
          placeholder="Kitap Ara..."
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <AiOutlineSearch onClick={handleArama} className={classes.icons} />
      </div>
      {search.length > 0 && (
        <div className={classes.searchBox}>
          {searchTerm.map((book) => (
            <div className={classes.searchBook}>
              <Image alt="" src={book.coverImage} width="50" height="80" />
              <div>
                <h2>{book.title}</h2>
                <h3>{book.author}</h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
