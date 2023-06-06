"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import classes from "./navbar.module.css";
import person from "../../../public/person.jpg";
import logo from "../../../public/logo.png";
import { AiOutlineSearch } from "react-icons/ai";

const Navbar = () => {
  const loggenIn = true;

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
          {loggenIn ? (
            <button className={classes.navbarProfile}>
              <Link href="/profile">
                <Image
                  alt="profilResmi"
                  src={person}
                  width="45"
                  height="45"
                  className={classes.image}
                />
              </Link>
            </button>
          ) : (
            <ul className={classes.right}>
              <>
                <button className={classes.login}>Log in</button>
                <Link href="/register">Register</Link>
              </>
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
