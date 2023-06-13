"use client";
import React, { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { profile } from "@/lib/profile";
import classes from "./profile.module.css";
import Image from "next/image";
import { AiFillBook } from "react-icons/ai";
import { FaBirthdayCake } from "react-icons/fa";
import { BiCurrentLocation } from "react-icons/bi";
import { TbNetwork } from "react-icons/tb";
import { BsFillPostcardFill } from "react-icons/bs";

const Profile = (ctx) => {
  const [user, setUser] = useState("");

  const router = useRouter();

  console.log(ctx.params.id);
  console.log(user);

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
        <Image
          className={classes.backgroundImage}
          alt="background"
          src={profile[0].backgroundImage}
          heigh={100}
        />
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
        </div>
        <div className={classes.post}></div>
      </div>
      <Link href="/">
        <button onClick={handleSignOut}>logout</button>
      </Link>
    </div>
  );
};

export default Profile;
