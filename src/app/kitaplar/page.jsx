"use client";
import React, { useEffect, useState } from "react";
import classes from "./populer.module.css";
import ProductCard from "@/components/productCard/ProductCard";

const Populer = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]); // Filtrelenmiş verileri saklayacak state
  const [filterPageRange, setFilterPageRange] = useState(""); // Filtre için sayfa aralığı
  const [filterGenre, setFilterGenre] = useState(""); // Filtre için tür

  useEffect(() => {
    async function fetchBooks() {
      const res = await fetch(`http://localhost:3000/api/book`, {
        cache: "no-store",
      });
      const book = await res.json();

      setBooks(book);
    }
    fetchBooks();
  }, []);

  useEffect(() => {
    // Sayfa aralığına göre filtreleme
    const [minPageCount, maxPageCount] = filterPageRange.split("-").map(Number);
    const filteredByPageRange = books.filter(
      (book) => book.pageCount >= minPageCount && book.pageCount <= maxPageCount
    );

    // Türüne göre filtreleme
    const filteredByGenre = books.filter((book) => book.genre === filterGenre);

    // İki filtreleme sonucunu birleştirme
    const filteredData =
      filterPageRange === "" ? filteredByGenre : filteredByPageRange;
    setFilteredBooks(filteredData);
  }, [filterPageRange, filterGenre]);

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
            <option value="100-150">100-150 Sayfa</option>
            <option value="150-200">150-200 Sayfa</option>
            {/* Diğer seçenekleri buraya ekleyebilirsiniz */}
          </select>
        </label>

        <label>
          Tür:
          <select
            value={filterGenre}
            onChange={(e) => setFilterGenre(e.target.value)}
          >
            <option value="">Tümü</option>
            <option value="komedi">Komedi</option>
            <option value="roman">Roman</option>
            <option value="hikaye">Hikaye</option>
            {/* Diğer türleri buraya ekleyebilirsiniz */}
          </select>
        </label>
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
