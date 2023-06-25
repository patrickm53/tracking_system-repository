"use client";
import React, { useEffect, useState } from "react";
import { AiFillBook } from "react-icons/ai";
import { FaBirthdayCake } from "react-icons/fa";
import { BiCurrentLocation } from "react-icons/bi";
import { TbNetwork } from "react-icons/tb";
import { BsFillPostcardFill } from "react-icons/bs";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { profile } from "@/lib/profile";
import classes from "./profile.module.css";
import Image from "next/image";
import { books } from "../../../lib/data";
import ProfilePost from "@/components/profilePost/ProfilePost";

const Profile = (ctx) => {
  const [user, setUser] = useState("");

  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch(
        `http://localhost:3000/api/profile/${ctx.params.id}`,
        { cache: "no-store" }
      );
      const user = await res.json();

      setUser(user);
    }
    fetchUser();
  }, []);

  const handleSignOut = async (event) => {
    event.preventDefault();

    await signOut({ redirect: false });

    router.push("/");
  };

  return (
    <div className={classes.container}>
      <div className={classes.imageContainer}>
        <div className={classes.profileNavbar}>
          <Image
            className={classes.backgroundImage}
            alt="background"
            src={profile[0].backgroundImage}
            heigh={100}
          />
          <div className={classes.navbar}>
            <div className={classes.navbarLeft}>
              <button>Yayınlar</button>
              <button>Yorumlar</button>
            </div>
            <div className={classes.navbarRight}>
              <button>Takip Et</button>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.wrapper}>
        <div className={classes.personProfile}>
          <div className={classes.profileImageContainer}>
            <Image
              className={classes.profileImage}
              alt="profilePerson"
              src={profile[0].profileImage}
              width={150}
              height={150}
            />
          </div>
          <h2>
            {profile[0].name}
            <AiFillBook />
          </h2>
          <h3>@{profile[0].username}</h3>
          <p>Okul gezer yer</p>
          <a>@Twitter</a>
          <div className={classes.information}>
            <div className={classes.info}>
              <BiCurrentLocation /> <span>Türkiye</span>
            </div>
            <div className={classes.link}>
              <TbNetwork />
              <a>seyityahya.com</a>
            </div>
            <div className={classes.info}>
              <FaBirthdayCake /> <span>mart 1999</span>
            </div>
            <div className={classes.link}>
              <BsFillPostcardFill />
              <a>28 post - 150 comment</a>
            </div>
          </div>
          <Link href="/">
            <button onClick={handleSignOut}>logout</button>
          </Link>
        </div>
        <div className={classes.post}>
          {books?.length > 0 ? (
            books.map((book) => <ProfilePost key={book._id} book={book} />)
          ) : (
            <div>kitap yok</div>
          )}
        </div>
        <div className={classes.right}>
          <h2>Takip Önerisi</h2>
          <div className={classes.followPerson}>
            <span>
              <Image
                className={classes.followImage}
                alt="takipöneri"
                src={profile[0].profileImage}
                width="45"
                height="45"
              />
              <div className={classes.followName}>
                <a>Deniz Taş</a>
                <h3>@deniz8255</h3>
              </div>
            </span>
            <button>Takip Et</button>
          </div>
          <div className={classes.followPerson}>
            <span>
              <Image
                className={classes.followImage}
                alt="takipöneri"
                src={profile[0].profileImage}
                width="45"
                height="45"
              />
              <div className={classes.followName}>
                <a>Deniz Taş</a>
                <h3>@deniz8255</h3>
              </div>
            </span>
            <button>Takip Et</button>
          </div>
          <div className={classes.followPerson}>
            <span>
              <Image
                className={classes.followImage}
                alt="takipöneri"
                src={profile[0].profileImage}
                width="45"
                height="45"
              />
              <div className={classes.followName}>
                <a>Deniz Taş</a>
                <h3>@deniz8255</h3>
              </div>
            </span>
            <button>Takip Et</button>
          </div>
          <div className={classes.followPerson}>
            <span>
              <Image
                className={classes.followImage}
                alt="takipöneri"
                src={profile[0].profileImage}
                width="45"
                height="45"
              />
              <div className={classes.followName}>
                <a>Deniz Taş</a>
                <h3>@deniz8255</h3>
              </div>
            </span>
            <button>Takip Et</button>
          </div>
          <a>daha fazla</a>
        </div>
      </div>
    </div>
  );
};

export default Profile;
