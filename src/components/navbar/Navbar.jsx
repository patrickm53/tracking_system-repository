"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import classes from "./navbar.module.css";
import person from "../../../public/person.jpg";
import logo from "../../../public/logo.png";
import { AiOutlineSearch, AiOutlinePlusCircle } from "react-icons/ai";
import { signIn, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  const loggenIn = false;

  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <div className={classes.container}>
        <div className={classes.wrapper}>
          <h2 className={classes.left}>
            <Link href="/">
              <Image alt="logo" src={logo} height="50" className="logoImage" />
            </Link>
          </h2>
          <div className={classes.middle}>
            <button>
              <Link href="/">Ana Sayfa</Link>
            </button>
            <button>
              <Link href="/populer">Populer</Link>
            </button>
            <button>
              <Link href="/rastgele">Rastgele</Link>
            </button>
            <div className={classes.search}>
              <input
                type="text"
                placeholder="Kitap Ara..."
                value={searchTerm}
                onChange={handleInputChange}
              />
              <AiOutlineSearch className={classes.icons} />
            </div>
          </div>
          {session?.user ? (
            <div className={classes.profile}>
              <button className={classes.create}>
                <Link href={`/create-book`}>
                  <AiOutlinePlusCircle className={classes.createIcon} />
                </Link>
              </button>
              <button className={classes.navbarProfile}>
                <Link href={`/profile/${session.user._id}`}>
                  <Image
                    alt="profilResmi"
                    src={person}
                    width="45"
                    height="45"
                    className={classes.image}
                  />
                </Link>
              </button>
            </div>
          ) : (
            <ul className={classes.right}>
              <>
                <button
                  onClick={() => {
                    signIn();
                  }}
                  className={classes.login}
                >
                  Giriş Yap
                </button>
                <Link href="/register">Kayıt Ol</Link>
              </>
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
