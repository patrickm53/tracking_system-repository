"use client";
import React, { useState, useEffect } from "react";
import classes from "./productCard.module.css";
import Link from "next/link";
import Image from "next/image";
import { AiOutlineLike, AiFillStar, AiFillLike } from "react-icons/ai";
import colors from "../../lib/color.js";
import { useSession } from "next-auth/react";
import { ProfileImageControl } from "../imageUndefined/ImageUndefined";

const ProductCard = ({ book, profile }) => {
  const { data: session } = useSession();
  const [backgroundColor, setBackgroundColor] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [bookLikes, setBookLikes] = useState(0);

  useEffect(() => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setBackgroundColor(randomColor);
  }, []);

  useEffect(() => {
    session && book && setIsLiked(book?.likes?.includes(session?.user?._id));
    session && book && setBookLikes(book?.likes?.length);
  }, [book, session]);

  const handleLike = async () => {
    try {
      const res = await fetch(`/api/book/${book._id}/like`, {
        headers: {
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
        method: "PUT",
      });

      if (res.ok) {
        if (isLiked) {
          setIsLiked((prev) => !prev);
          setBookLikes((prev) => prev - 1);
        } else {
          setIsLiked((prev) => !prev);
          setBookLikes((prev) => prev + 1);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.body}>
      <div className={classes.container}>
        {profile !== false && (
          <div className={classes.person}>
            <ProfileImageControl
              altImage={book?.user?._id}
              imageName={book?.user?.profilImage}
              widthImage="32"
              heightImage="32"
              className={classes.personImg}
              person={true}
            />
            <Link href={`/profile/${book.user?._id}`}>
              <h2 className={classes.uploader}>{book.user?.name}</h2>
            </Link>
            <span>•</span>
            <div className={classes.clock}>3s</div>
            <span>•</span>
            <button className={classes.followers}>Takip Et</button>
          </div>
        )}
        <div style={{ backgroundColor }} className={classes.wrapper}>
          <Link className={classes.imgContainer} href={`/book/${book?._id}`}>
            <ProfileImageControl
              className={classes.bookImage}
              imageName={book.bookImage}
              altImage={book?._id || book?.title}
              heightImage="225"
              widthImage="150"
              person={false}
            />
          </Link>
          <div className={classes.bookDetail}>
            <div className={classes.authorDetail}>
              <h2>{book.title}</h2>
              <h3>{book.author}</h3>
            </div>
            <div
              className={classes.desc}
              dangerouslySetInnerHTML={{ __html: book.description }}
            ></div>
            <div className={classes.rateLike}>
              <div className={classes.rate}>
                <AiFillStar className={classes.star} />
                <span>{book.rating}</span>
              </div>
              <div className={classes.like}>
                <span>{bookLikes}</span>
                {isLiked ? (
                  <AiFillLike
                    className={classes.likeIcon}
                    onClick={handleLike}
                    size={20}
                  />
                ) : (
                  <AiOutlineLike
                    className={classes.likeIcon}
                    onClick={handleLike}
                    size={20}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
