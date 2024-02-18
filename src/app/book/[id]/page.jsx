"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import classes from "./book.module.css";
import Link from "next/link";
import StarRatings from "react-star-ratings";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Comment from "@/components/comment/Comment";
import {
  getBook,
  fetchBookId,
  fetchComment,
  fetchProfileBook,
  fetchCommentPost,
  fetchProfile,
} from "../../api";

const BookDetails = (ctx) => {
  const [bookDetails, setBookDetails] = useState("");
  const [similarBooks, setSimilarBooks] = useState([]);
  const [profileBooks, setProfileBooks] = useState([]);
  const [postCount, setPostCount] = useState(0);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [userDetail, setUserDetail] = useState("");

  const { data: session } = useSession();
  const router = useRouter;

  useEffect(() => {
    async function fetchProfiles() {
      const id = session?.user?._id;
      const data = await fetchProfile(id);

      setUserDetail(data);
    }
    fetchProfiles();
  }, [session]);

  useEffect(() => {
    async function fetchComments() {
      const data = await fetchComment(ctx.params.id);

      const comments = data.comments;

      setComments(comments);
    }
    fetchComments();
  }, [ctx]);

  useEffect(() => {
    async function fetchBook() {
      const book = await fetchBookId(ctx.params.id);

      setBookDetails(book);
    }
    session && fetchBook();
  }, [ctx, session]);

  useEffect(() => {
    const fetchSimilarBooks = async () => {
      try {
        const books = await getBook();
        const filteredBooks = books.filter(
          (book) =>
            book._id !== bookDetails?._id &&
            book.genres.some((genre) => bookDetails?.genres.includes(genre))
        );
        const randomBooks = getNRandomElements(filteredBooks, 3);
        setSimilarBooks(randomBooks);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSimilarBooks();
  }, [bookDetails]);

  useEffect(() => {
    const fetchProfileBooks = async () => {
      try {
        const books = await fetchProfileBook(bookDetails.user._id);

        const differentBooks = books.filter(
          (book) => book._id !== bookDetails?._id
        );

        const filteredBooks = differentBooks.slice(0, 3);

        setProfileBooks(filteredBooks);
        setPostCount(books.length);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfileBooks();
  }, [bookDetails]);

  const getNRandomElements = (arr, n) => {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  };

  const handleComment = async () => {
    if (commentText?.length < 2) {
      toast.error("Comment must be at least 2 characters long");
      return;
    }

    try {
      const body = {
        bookId: ctx.params.id,
        authorId: session?.user?._id,
        text: commentText,
      };

      const token = session?.user?.accessToken;

      const newComment = await fetchCommentPost(token, body);

      setComments((prev) => {
        return [newComment, ...prev];
      });

      setCommentText("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.imgContainer}>
          <Image
            alt="bookDetailImage"
            src={bookDetails.coverImage}
            className={classes.image}
            width="250"
            height="500"
          />
          <button className={classes.button1}>Diğer Okurlar</button>
          <Link href={"/createbook"}>
            <button className={classes.button2}>Yorum Paylaş</button>
          </Link>
          <div className={classes.bookSayfa}>
            <div>
              <span>sayfa sayısı : </span>
              <span>Dil : </span>
              <span>Yayın Tarihi : </span>
            </div>
            <div className={classes.bilgi}>
              <span>{bookDetails.pages}</span>
              <span>{bookDetails.language}</span>
              <span>{bookDetails.years}</span>
            </div>
          </div>
        </div>
        <div className={classes.bookDetail}>
          <h1>{bookDetails.title}</h1>
          <div className={classes.authorStar}>
            <h3>{bookDetails.author}</h3>
            <div className={classes.rate}>
              <StarRatings
                rating={bookDetails.rating}
                starRatedColor="#f1c40f"
                starEmptyColor="#ccc"
                starDimension="18px"
                starSpacing="1px"
              />
              <span>{bookDetails.rating}</span>
            </div>
          </div>
          <div className={classes.bookDetailsProfil}>
            <div>
              <Link
                className={classes.link}
                href={`/profile/${bookDetails?.user?._id}`}
              >
                <Image
                  alt="detailProfil"
                  src={`https://bookwave-profile-image.s3.eu-central-1.amazonaws.com/profileImage/${bookDetails?.user?.profilImage}`}
                  width="30"
                  height="30"
                  className={classes.detailsProfilImage}
                />
                {bookDetails?.user?.name}
              </Link>
              <div>
                - paylaşım <span>{postCount}</span> - yorum <span>72</span>
              </div>
            </div>
          </div>
          <div
            className={classes.desc}
            dangerouslySetInnerHTML={{ __html: bookDetails.description }}
          />

          <div className={classes.tür}>
            tür :
            {bookDetails?.genres?.map((genre, index) => (
              <span key={index}>{genre}</span>
            ))}
          </div>
          {similarBooks.length > 0 && (
            <>
              <div className={classes.similar}>
                <h2>Benzer Türde Kitaplar</h2>
                <ul>
                  {similarBooks.map((book) => (
                    <li key={book._id}>
                      <Link className={classes.link} href={`/book/${book._id}`}>
                        <div className={classes.imgSimilarContainer}>
                          <Image
                            alt="book._id"
                            src={book.coverImage}
                            width="150"
                            height="300"
                            className={classes.image}
                          />
                        </div>
                      </Link>
                      <h2>{book.title}</h2>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
          {profileBooks.length > 0 && (
            <>
              <div className={classes.similar}>
                <h2>Kullanıcının Diğer Kitapları</h2>
                <ul>
                  {profileBooks.map((book) => (
                    <li key={book._id}>
                      <Link className={classes.link} href={`/book/${book._id}`}>
                        <div className={classes.imgSimilarContainer}>
                          <Image
                            alt="book._id"
                            src={book.coverImage}
                            width="150"
                            height="300"
                            className={classes.image}
                          />
                        </div>
                      </Link>
                      <h2>{book.title}</h2>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
          <div className={classes.commentSection}>
            <div className={classes.commentInput}>
              <Image
                src={`https://bookwave-profile-image.s3.eu-central-1.amazonaws.com/profileImage/${userDetail?.profilImage}`}
                width="45"
                height="45"
                alt=""
              />
              <input
                value={commentText}
                type="text"
                placeholder="Yorumunu Yaz..."
                onChange={(e) => setCommentText(e.target.value)}
              />
              <button onClick={handleComment}>Paylaş</button>
            </div>
            <div className={classes.comments}>
              {comments?.length > 0 ? (
                comments.map((comment) => (
                  <Comment
                    key={comment._id}
                    comment={comment}
                    setComments={setComments}
                    userDetail={userDetail}
                  />
                ))
              ) : (
                <h4 className={classes.noComments}>
                  Yorum yok! İlk sen yapmak ister misin?
                </h4>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default BookDetails;
