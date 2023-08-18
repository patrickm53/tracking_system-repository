"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import classes from "./navbar.module.css";
import person from "../../../public/person.jpg";
import logo from "../../../public/logo.png";
import {
  AiOutlineSearch,
  AiOutlinePlusCircle,
  AiFillHome,
} from "react-icons/ai";
import { ImBooks } from "react-icons/im";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { IoMdSettings } from "react-icons/io";
import { HiUserGroup } from "react-icons/hi";
import { signIn, useSession } from "next-auth/react";
import Search from "../search/Search";

const Navbar = () => {
  const { data: session } = useSession();
  const loggenIn = false;

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
              <AiFillHome />
              <Link className={classes.navbarText} href="/">
                Ana Sayfa
              </Link>
            </button>
            <button>
              <ImBooks />
              <Link className={classes.navbarText} href="/kitaplar">
                Tüm Kitaplar
              </Link>
            </button>
            <button>
              <GiPerspectiveDiceSixFacesRandom />
              <Link className={classes.navbarText} href="/rastgele">
                Rastgele
              </Link>
            </button>
            <button>
              <HiUserGroup />
              <Link className={classes.navbarText} href="/community">
                Topluluk
              </Link>
            </button>
            <Search />
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
              <button>
                <Link href={"/settings"}>
                  <IoMdSettings className={classes.settingsIcon} />
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
