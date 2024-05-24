"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { AiFillBook } from "react-icons/ai";
import { FaBirthdayCake } from "react-icons/fa";
import { BiCurrentLocation } from "react-icons/bi";
import { TbNetwork } from "react-icons/tb";
import { BsFillPostcardFill } from "react-icons/bs";
import { useRouter } from "next/navigation";
import classes from "./profile.module.css";
import Image from "next/image";
import ProfilePost from "@/components/profilePost/ProfilePost";
import person from "../../../../public/person.jpg";
import background from "../../../../public/background2.jpg";
import {
  fetchProfileBookPage,
  fetchProfile,
  fetchAllProfile,
  fetchFollowUser,
  fetchGetFollowControl,
  fetchSuggestionProfile,
} from "@/app/api";
import Suggestion from "@/components/suggestion/Suggestion";
import { ProfileImageControl } from "@/components/imageUndefined/ImageUndefined";
import PaginationButton from "@/components/paginationBtn/PaginationButton";
import Loading from "@/components/loading/Loading";
import { ClipLoader, FadeLoader, PulseLoader } from "react-spinners";

const Profile = (ctx) => {
  const [suggestion, setSuggestion] = useState(null);
  const [user, setUser] = useState("");
  const [books, setBooks] = useState([]);
  const [navbarSelect, setNavbarSelect] = useState("yayınlar");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [followControl, setFollowControl] = useState(null);

  const { data: session } = useSession(false);

  const router = useRouter();
  let userBirthday = "";

  useEffect(() => {
    async function fetchUser() {
      const user = await fetchProfile(ctx.params.id);

      setUser(user);
    }
    async function fetchData() {
      // const cachedBooks = JSON.parse(localStorage.getItem("profileBooks"));
      // if (cachedBooks) {
      //   setBooks(cachedBooks.books);
      //   setCurrentPage(cachedBooks.currentPage);
      //   setTotalPages(cachedBooks.totalPages);
      // } else {
      const user = await fetchProfile(ctx.params.id);
      setUser(user);
      const response = await fetchProfileBookPage(ctx.params.id, currentPage);
      const fetchedBooks = response.books;
      const fetchedTotalPages = response.totalPages;
      const fetchedCurrentPages = response.currentPage;
      setBooks(fetchedBooks);
      setCurrentPage(fetchedCurrentPages);
      setTotalPages(fetchedTotalPages);
      //   const cachedData = {
      //     books: fetchedBooks,
      //     currentPage: fetchedCurrentPages,
      //     totalPages: fetchedTotalPages,
      //   };
      //   localStorage.setItem("profileBooks", JSON.stringify(cachedData));
      // }
    }
    async function fetchSuggestion() {
      if (suggestion?.length > 1) {
        return;
      }
      const users = await fetchSuggestionProfile(
        session?.user?._id,
        ctx.params.id
      );
      setSuggestion(users);
    }
    fetchUser();
    fetchData();
    fetchSuggestion();
  }, [ctx, session, suggestion]);

  useEffect(() => {
    if (!session || !user) {
      return;
    }
    async function fetchFollowControlUser() {
      const getFollowControl = await fetchGetFollowControl(
        session?.user?._id,
        user._id
      );
      setFollowControl(getFollowControl);
      console.log("Control", getFollowControl);
    }
    fetchFollowControlUser();
  }, [session, user]);

  const handleButtonClick = (buttonName) => {
    setNavbarSelect(buttonName);
  };

  if (user.birthday) {
    userBirthday = user.birthday.split("T")[0];
  }

  async function fetchMoreBooks() {
    const response = await fetchProfileBookPage(ctx.params.id, currentPage + 1);
    const fetchedBooks = response.books;
    const fetchedTotalPages = response.totalPages;
    const fetchedCurrentPages = response.currentPage;

    setCurrentPage(fetchedCurrentPages);
    setTotalPages(fetchedTotalPages);
    setBooks((prevBooks) => [...prevBooks, ...fetchedBooks]);
    const cachedData = {
      books: [...books, ...fetchedBooks],
      currentPage: fetchedCurrentPages,
      totalPages: fetchedTotalPages,
    };
    localStorage.setItem("profileBooks", JSON.stringify(cachedData));
  }

  async function handleFollow({ action }) {
    console.log("action", action);
    if (action === "follow") {
      setFollowControl(true);
    } else if (action === "unfollow") {
      setFollowControl(false);
    }
    const token = session?.user?.accessToken;
    const response = await fetchFollowUser(
      token,
      session?.user?._id,
      user._id,
      action
    );
  }

  return (
    <div className={classes.container}>
      <div className={classes.imageContainer}>
        <div className={classes.profileNavbar}>
          <Image
            className={classes.backgroundImage}
            alt="background"
            src={background}
            heigh={100}
          />
          <div className={classes.navbar}>
            <div className={classes.navbarLeft}>
              <button
                className={navbarSelect === "yayınlar" ? classes.active : ""}
                onClick={() => handleButtonClick("yayınlar")}
              >
                Yayınlar
              </button>
              <button
                className={navbarSelect === "yorumlar" ? classes.active : ""}
                onClick={() => handleButtonClick("yorumlar")}
              >
                Yorumlar
              </button>
            </div>
            <div className={classes.navbarRight}>
              {session?.user?._id === user._id || followControl === null ? (
                <></>
              ) : followControl === false ? (
                <button
                  className={classes.followButton}
                  onClick={() => handleFollow({ action: "follow" })}
                >
                  Takip Et
                </button>
              ) : followControl === true ? (
                <button
                  onClick={() => handleFollow({ action: "unfollow" })}
                  className={classes.followingButton}
                >
                  Takiptesin
                </button>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={classes.wrapper}>
        <div className={classes.personAndStory}>
          <div className={classes.personProfile}>
            <div className={classes.top}>
              <div className={classes.profileImageContainer}>
                <ProfileImageControl
                  altImage="profilePerson"
                  imageName={user?.profilImage}
                  widthImage="150"
                  heightImage="150"
                  className={classes.profileImage}
                  person={true}
                />
              </div>
              <h2>
                {user.name}
                <AiFillBook />
              </h2>
              <h3>@{user.username}</h3>
            </div>
            <div className={classes.bottom}>
              <p>{user.word}</p>
              <a>@Twitter</a>
              <div className={classes.information}>
                <div className={classes.info}>
                  <BiCurrentLocation /> <span>{user.location}</span>
                </div>
                <div className={classes.link}>
                  <TbNetwork />
                  <a>{user.website}</a>
                </div>
                <div className={classes.info}>
                  <FaBirthdayCake /> <span>{userBirthday}</span>
                </div>
                <div className={classes.link}>
                  <BsFillPostcardFill />
                  <a>28 post - 150 comment</a>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.personStoryProfile}>
            <p>{user.story}</p>
          </div>
        </div>
        <div className={classes.post}>
          {navbarSelect === "yayınlar" ? (
            <div className={classes.postAndStory}>
              {books === "dont" ? (
                <div>kitap yok</div>
              ) : books?.length > 0 ? (
                books.map((book) => <ProfilePost key={book._id} book={book} />)
              ) : (
                <></>
              )}
              <PaginationButton
                currentPage={currentPage}
                totalPages={totalPages}
                onClick={fetchMoreBooks}
                margin="mt-2 mb-10"
              />
            </div>
          ) : (
            ""
          )}
          {navbarSelect === "yorumlar" ? <div>yorumlar</div> : ""}
        </div>

        {/* Takip önerisi kısmı */}

        <div className={classes.right}>
          <h2>Takip Önerisi</h2>
          {suggestion?.length > 0 && session ? (
            suggestion.map((user) => (
              <Suggestion key={user._id} user={user} session={session} />
            ))
          ) : suggestion?.length === 0 ? (
            <></>
          ) : (
            <div className={classes.loadingContainer}>
              <FadeLoader size={50} color={"#bababa"} loading={true} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
