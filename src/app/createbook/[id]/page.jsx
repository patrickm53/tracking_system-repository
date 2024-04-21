"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import classes from "./createBookComment.module.css";
import "react-quill/dist/quill.snow.css";
import { fetchBookPost, fetchBookId } from "../../api";
import dynamic from "next/dynamic";
import ReactStars from "react-rating-stars-component";
import ProductCard from "@/components/productCard/ProductCard";
import Loading from "@/components/loading/Loading";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const CreateBookComment = (ctx) => {
  const [books, setBooks] = useState([]);
  const [rating, setRating] = useState();
  const [disabled, setDisabled] = useState(false);
  const [description, setDescription] = useState("");

  const { data: session, status } = useSession();

  const router = useRouter();

  useEffect(() => {
    async function fetchBooks() {
      const book = await fetchBookId(ctx?.params?.id);
      if (book.description) {
        book.description = description;
      }
      console.log("gırdı");
      setBooks(book);
    }
    fetchBooks();
  }, [ctx]);

  useEffect(() => {
    if (books) {
      books.description = description;
    }
  }, [description]);

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "unauthenticated") {
    return <p className={classes.accessDenied}>Access Denied</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);

    if (!coverImage || !title || !rating || !author) {
      toast.error("All fields are required");
      setDisabled(false);
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
    setDisabled(false);
  };

  return (
    <div className={classes.container}>
      <h2>
        <span>{books?.title}</span>
      </h2>
      <div className={classes.wrapper}>
        <div className={classes.inputBox}>
          <p>Puanınız:</p>
          <div className={classes.starPuan}>
            <ReactStars
              size={40}
              count={5}
              value={rating}
              isHalf={true}
              onChange={(newValue) => setRating(newValue)}
            />
          </div>
        </div>
        <ReactQuill
          value={description}
          onChange={(e) => setDescription(e)}
          placeholder="Hikayeni yaz"
          className={classes.yourStory}
        />
      </div>
      <div className={classes.submitBook}>
        <ProductCard book={books} profile={false} />
      </div>
      <button
        disabled={disabled}
        className={classes.createBlog}
        onClick={handleSubmit}
      >
        Paylaş
      </button>
      <ToastContainer />
    </div>
  );
};

export default CreateBookComment;
