import Link from "next/link";
import { useEffect, useState } from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import StarRatings from "react-star-ratings";
import { ProfileImageControl } from "../imageUndefined/ImageUndefined";
import classes from "./bookDetailComment.module.css";

const BookDetailComment = ({ bookDetails }) => {
  const [ago, setAgo] = useState("");
  useEffect(() => {
    const dateNow = new Date();
    const dateCreate = new Date(bookDetails.createdAt);
    const diff = Math.floor((dateNow - dateCreate) / (1000 * 60 * 60 * 24));
    if (diff === 0) {
      setAgo("Today");
    } else if (diff === 1) {
      setAgo("1d ago");
    } else if (diff < 30) {
      setAgo(`${diff}d ago`);
    } else if (diff < 365) {
      const months = Math.floor(diff / 30);
      setAgo(`${months}m ago`);
    } else {
      const years = Math.floor(diff / 365);
      setAgo(`${years}y ago`);
    }
  }, [bookDetails]);
  return (
    <div className={classes.container}>
      <div className={classes.bookDetailsProfil}>
        <div>
          <Link
            className={classes.link}
            href={`/profile/${bookDetails?.user?._id}`}
          >
            <ProfileImageControl
              altImage="detailProfil"
              imageName={bookDetails?.user?.profilImage}
              widthImage="30"
              heightImage="30"
              className={classes.detailsProfilImage}
              person={true}
            />
            {bookDetails?.user?.name}
          </Link>
          <div>
            - paylaşım <span>12</span> - yorum <span>72</span>
          </div>
        </div>
        <div className={classes.commentRating}>
          <StarRatings
            rating={bookDetails?.rating}
            starRatedColor="#f1c40f"
            starEmptyColor="#ccc"
            starDimension="14px"
            starSpacing="0"
          />
          <span>{bookDetails?.rating}</span>
        </div>
      </div>
      <div
        className={classes.desc}
        dangerouslySetInnerHTML={{ __html: bookDetails?.description }}
      />
      <div className={classes.dateAndLike}>
        <div className={classes.likeButton}>
          <AiOutlineLike />
          <span>{bookDetails?.likes?.length}</span>
        </div>
        <div className={classes.createdAt}>{ago}</div>
      </div>
    </div>
  );
};

export default BookDetailComment;
