"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import classes from "./create-book.module.css";

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

  const { data: session, status } = useSession();

  const router = useRouter();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <p className={classes.accessDenied}>Access Denied</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!coverImage || !title || !rating || !author || !description) {
      toast.error("All fields are required");
      return;
    }

    try {
      const processedGenres = genres.map((genre) => genre.toLowerCase());
      const res = await fetch(`http://localhost:3000/api/book`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
        method: "POST",
        body: JSON.stringify({
          title,
          coverImage,
          rating,
          author,
          description,
          // genres: genres.map((genre) => genre.trim()),
          genres: processedGenres,
          pages,
          years,
          language,
          user: session?.user?._id,
        }),
      });

      if (!res.ok) {
        throw new Error("Error occured");
      }

      const book = await res.json();

      router.push(`/book/${book?._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2>Create Post</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Başlık..."
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Resim..."
            onChange={(e) => setCoverImage(e.target.value)}
          />
          <input
            type="text"
            placeholder="Puanı..."
            onChange={(e) => setRating(e.target.value)}
          />
          <input
            type="text"
            placeholder="Kitap Yazarı..."
            onChange={(e) => setAuthor(e.target.value)}
          />
          <input
            type="text"
            placeholder="Sayfa Sayısı..."
            onChange={(e) => setPages(e.target.value)}
          />
          <input
            type="text"
            placeholder="Kitabı Dili..."
            onChange={(e) => setLanguage(e.target.value)}
          />
          <input
            type="text"
            placeholder="Kitap Çıkış Yılı..."
            onChange={(e) => setYears(e.target.value)}
          />
          <input
            type="text"
            placeholder="Tür (virgül koymayı unutma)..."
            onChange={(e) => setGenres(e.target.value.split(","))}
          />
          <textarea
            placeholder="Hikayen..."
            onChange={(e) => setDescription(e.target.value)}
          />
          <button className={classes.createBlog}>Create</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreateBook;
