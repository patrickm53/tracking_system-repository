"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import classes from "./create-book.module.css";
import "react-quill/dist/quill.snow.css";
import { GrSearch } from "react-icons/gr";
import Image from "next/image";
import { AiFillStar } from "react-icons/ai";
import { getBook, fetchBookPost, fetchSearchBook } from "../api";
import dynamic from "next/dynamic";

const CreateBook = () => {
  const [title, setTitle] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [rating, setRating] = useState();
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [genres, setGenres] = useState([]);
  const [pages, setPages] = useState("");
  const [language, setLanguage] = useState("");
  const [years, setYears] = useState("");
  const [debouncedSearchBook, setDebouncedSearchBook] = useState("");
  const [searchBook, setSearchBook] = useState("");
  const [resultBooks, setResultBooks] = useState([]);

  const { data: session, status } = useSession();

  const router = useRouter();

  const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

  useEffect(() => {
    if (searchBook?.length < 3) {
      setResultBooks([]);
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
        const book = await fetchSearchBook(debouncedSearchBook);
        console.log(book);
        setResultBooks(book);
      }
      fetchSearchBooks();
    }
  }, [debouncedSearchBook]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <p className={classes.accessDenied}>Access Denied</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!coverImage || !title || !rating || !author) {
      toast.error("All fields are required");
      return;
    }

    try {
      const processedGenres = genres.map((genre) => genre.toLowerCase());
      const body = {
        title,
        coverImage,
        rating,
        author,
        description,
        genres: processedGenres,
        pages,
        years,
        language,
        user: session?.user?._id,
      };

      const token = session?.user?.accessToken;

      const book = await fetchBookPost(token, body);

      router.push(`/book/${book?._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBook = async (value) => {
    setTitle(value?.title);
    setCoverImage(value?.coverImage);
    setAuthor(value?.author);
    setPages(value?.pages);
    setLanguage(value?.language);
    setYears(value?.years);
    setGenres(value?.genres);
  };

  return (
    <div className={classes.container}>
      <h2>Yorumunu Paylaş</h2>
      <div className={classes.wrapper}>
        <div className={classes.searchBox}>
          <div className={classes.search}>
            <input
              type="text"
              onChange={(e) => setSearchBook(e.target.value)}
              placeholder="Kitabı Ara"
            />
            <div className={classes.searchIcon}>
              <GrSearch />
            </div>
          </div>
          {resultBooks.length > 0 && resultBooks !== "dont" ? (
            <div className={classes.searchBooks}>
              {resultBooks.map((book) => (
                <div
                  key={book._id}
                  className={classes.book}
                  onClick={(e) => handleBook(book)}
                >
                  <Image
                    alt={book._id}
                    src={book.coverImage}
                    width="60"
                    height="80"
                  />
                  <div className={classes.searchBookDetail}>
                    <h2>{book.title}</h2>
                    <h3>{book.author}</h3>
                    <span>
                      <p>{book.pages} -</p>
                      <p>{book.language} -</p>
                      <p>{book.years}</p>
                    </span>
                  </div>
                  <div className={classes.star}>
                    <AiFillStar />
                    <span>{book.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : resultBooks === "dont" ? (
            <div>Aranan Kitap Bulunamadı</div>
          ) : searchBook.length < 3 ? (
            <div>3 harf gir</div>
          ) : (
            <div>loading</div>
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <div className={classes.formBox}>
            <div className={classes.inputBox}>
              <input
                value={title}
                type="text"
                placeholder="Başlık..."
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                value={coverImage}
                type="text"
                placeholder="Resim..."
                onChange={(e) => setCoverImage(e.target.value)}
              />
              <input
                value={rating}
                type="text"
                placeholder="Puanı..."
                onChange={(e) => setRating(e.target.value)}
              />
              <input
                value={author}
                type="text"
                placeholder="Kitap Yazarı..."
                onChange={(e) => setAuthor(e.target.value)}
              />
              <input
                value={pages}
                type="text"
                placeholder="Sayfa Sayısı..."
                onChange={(e) => setPages(e.target.value)}
              />
              <input
                value={language}
                type="text"
                placeholder="Kitabı Dili..."
                onChange={(e) => setLanguage(e.target.value)}
              />
              <input
                value={years}
                type="text"
                placeholder="Kitap Çıkış Yılı..."
                onChange={(e) => setYears(e.target.value)}
              />
              <input
                value={genres}
                type="text"
                placeholder="Tür (virgül koymayı unutma)..."
                onChange={(e) => setGenres(e.target.value.split(","))}
              />
            </div>
            <ReactQuill
              value={description}
              onChange={(e) => setDescription(e)}
              placeholder="Hikayeni yaz"
              className={classes.yourStory}
            />
          </div>
        </form>
      </div>
      <button className={classes.createBlog} onClick={handleSubmit}>
        Paylaş
      </button>
      <ToastContainer />
    </div>
  );
};

export default CreateBook;
