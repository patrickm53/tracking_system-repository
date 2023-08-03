"use client";
import React, { useEffect, useState } from "react";
import classes from "./populer.module.css";
import ProductCard from "@/components/productCard/ProductCard";

const Populer = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]); // Filtrelenmiş verileri saklayacak state
  const [filterPageRange, setFilterPageRange] = useState(""); // Filtre için sayfa aralığı
  const [filterLanguage, setFilterLanguage] = useState("");
  const [filterYears, setFilterYears] = useState("");
  const [filterStar, setFilterStar] = useState("");
  const [finishFilterLanguage, setFinishFilterLanguage] = useState([]);
  const [finishFilterPage, setFinishFilterPage] = useState([]);
  const [finishFilterYears, setFinishFilterYears] = useState([]);
  const [finishFilterStar, setFinishFilterStar] = useState([]);

  useEffect(() => {
    async function fetchBooks() {
      const res = await fetch(`http://localhost:3000/api/book`, {
        cache: "no-store",
      });
      const book = await res.json();

      setBooks(book);
      setFilteredBooks(book);
    }
    fetchBooks();
  }, []);

  useEffect(() => {
    //sayfa numarası seçildiği kısım
    if (filterPageRange === "") {
      setFinishFilterPage(books);
    } else {
      const [minPageCount, maxPageCount] = filterPageRange
        .split("-")
        .map(Number);
      const filteredByPageRange = books.filter(
        (book) => book.pages >= minPageCount && book.pages <= maxPageCount
      );
      setFinishFilterPage(filteredByPageRange);
    }

    // yayın tarihi kısmı
    if (filterYears === "") {
      setFinishFilterYears(books);
    } else {
      const [minYears, maxYears] = filterYears.split("-").map(Number);
      const filteredByYears = books.filter(
        (book) => book.years >= minYears && book.years <= maxYears
      );
      setFinishFilterYears(filteredByYears);
    }

    // dil seçeneği şeçildiği zamanki kısım
    if (filterLanguage === "" || filterLanguage === "all") {
      setFinishFilterLanguage(books);
    } else {
      const filteredLanguage = books.filter(
        (book) => book.language.toLowerCase() === filterLanguage
      );
      setFinishFilterLanguage(filteredLanguage);
    }

    //Yıldız seçeneği seçildi zaman çalışna kısım
    if (filterStar === "") {
      setFinishFilterStar(books);
    } else {
      const filteredStar = books.filter(
        (book) => Math.round(book.rating) === parseInt(filterStar)
      );
      setFinishFilterStar(filteredStar);
    }
  }, [filterLanguage, filterPageRange, filterYears, filterStar]);

  const handleFilter = (e) => {
    e.preventDefault();

    if (
      filterPageRange === "" &&
      filterLanguage === "" &&
      filterStar === "" &&
      filterYears === ""
    ) {
      setFilteredBooks(books);
    } else {
      const allFilter = finishFilterPage.filter(
        (item) =>
          finishFilterYears.includes(item) &&
          finishFilterLanguage.includes(item) &&
          finishFilterStar.includes(item)
      );
      setFilteredBooks(allFilter);
    }
    console.log("page", finishFilterPage);
    console.log("years", finishFilterYears);
    console.log("lang", finishFilterLanguage);
    console.log("star", finishFilterStar);
  };

  return (
    <div className={classes.container}>
      <div className={classes.filter}>
        <label>
          Sayfa Aralığı:
          <select
            value={filterPageRange}
            onChange={(e) => setFilterPageRange(e.target.value)}
          >
            <option value="">Tümü</option>
            <option value="0-100">0-100</option>
            <option value="100-200">100-200</option>
            <option value="200-300">200-300</option>
            <option value="300-400">300-400</option>
            <option value="400-500">400-500</option>
            <option value="500-600">500-600</option>
            <option value="600-100000">600+</option>
            {/* Diğer seçenekleri buraya ekleyebilirsiniz */}
          </select>
        </label>

        <label>
          Dil:
          <select
            value={filterLanguage}
            onChange={(e) => setFilterLanguage(e.target.value)}
          >
            <option value="">Tümü</option>
            <option value="türkçe">Türkçe</option>
            <option value="english">English</option>
          </select>
        </label>

        <label>
          Yayın Tarihi:
          <select
            value={filterYears}
            onChange={(e) => setFilterYears(e.target.value)}
          >
            <option value="">Tümü</option>
            <option value="2020-2100">2020 sonrası</option>
            <option value="2015-2020">2015-2020</option>
            <option value="2010-2015">2010-2015</option>
            <option value="2005-2010">2005-2010</option>
            <option value="2000-2005">2000-2005</option>
            <option value="0-2000">2000 öncesi</option>
          </select>
        </label>

        <label>
          Yıldız:
          <select
            value={filterStar}
            onChange={(e) => setFilterStar(e.target.value)}
          >
            <option value="">Tümü</option>
            <option value="5">5</option>
            <option value="4">4</option>
            <option value="3">3</option>
            <option value="2">2</option>
            <option value="1">1</option>
          </select>
        </label>

        <button onClick={handleFilter}>Ara</button>
      </div>
      <div className={classes.wrapper}>
        <div className={classes.product}>
          {filteredBooks?.length > 0 ? (
            filteredBooks.map((book) => (
              <ProductCard key={book._id} book={book} />
            ))
          ) : (
            <div>kitap yok</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Populer;
