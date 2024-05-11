"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import classes from "./navbar.module.css";
import logo from "../../../public/newLogo.png";
import {
  AiOutlineSearch,
  AiOutlinePlusCircle,
  AiFillHome,
  AiOutlineClose,
} from "react-icons/ai";
import { ImBooks } from "react-icons/im";
import {
  GiPerspectiveDiceSixFacesRandom,
  GiHamburgerMenu,
} from "react-icons/gi";
import { IoMdSettings } from "react-icons/io";
import { HiUserGroup } from "react-icons/hi";
import { signIn, useSession } from "next-auth/react";
import Search from "../search/Search";
import { fetchProfile } from "../../app/api";
import { ProfileImageControl } from "../imageUndefined/ImageUndefined";

const Navbar = () => {
  const { data: session } = useSession();
  const [userDetail, setUserDetail] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function fetchProfiles() {
      if (session) {
        const id = session?.user?._id;
        const data = await fetchProfile(id);

        setUserDetail(data);
      }
    }
    fetchProfiles();
  }, [session]);

  const menuOpenOrClose = (option) => {
    setIsOpen(option);
  };

  return (
    <>
      <div className={classes.container}>
        <div className={classes.wrapper}>
          <h2 className={classes.left}>
            <Link href="/">
              <Image alt="logo" src={logo} height="40" className="logoImage" />
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
                <Link href={`/createbook`}>
                  <AiOutlinePlusCircle className={classes.createIcon} />
                </Link>
              </button>
              <button className={classes.navbarProfile}>
                <Link href={`/profile/${session?.user?._id}`}>
                  <ProfileImageControl
                    imageName={userDetail?.profilImage}
                    widthImage={45}
                    heightImage={45}
                    altImage={"profilImage"}
                    className={classes.image}
                    person={true}
                  />
                </Link>
              </button>
              <button>
                <Link href={`/settings`}>
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
                <Link className={classes.register} href="/register">
                  Kayıt Ol
                </Link>
              </>
            </ul>
          )}
          <GiHamburgerMenu
            className={classes.hamburgerIcon}
            onClick={() => menuOpenOrClose(true)}
          />
        </div>
        {isOpen === true && (
          <div className={classes.menuNavbar}>
            <AiOutlineClose
              className={classes.closeIcon}
              onClick={() => menuOpenOrClose(false)}
            />
            <div className={classes.navbar}>
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
              <div className={classes.menuProfile}>
                <button className={classes.create}>
                  <Link href={`/createbook`}>
                    <AiOutlinePlusCircle className={classes.createIcon} />
                  </Link>
                </button>
                <button className={classes.navbarProfile}>
                  <Link href={`/profile/${session?.user?._id}`}>
                    <ProfileImageControl
                      altImage="profilResmi"
                      imageName={userDetail?.profilImage}
                      widthImage="45"
                      heightImage="45"
                      className={classes.image}
                      person={true}
                    />
                  </Link>
                </button>
                <button>
                  <Link href={`/settings`}>
                    <IoMdSettings className={classes.settingsIcon} />
                  </Link>
                </button>
              </div>
            ) : (
              <ul className={classes.menuNavbarBottom}>
                <>
                  <button
                    onClick={() => {
                      signIn();
                    }}
                    className={classes.login}
                  >
                    Giriş Yap
                  </button>
                  <Link className={classes.register} href="/register">
                    Kayıt Ol
                  </Link>
                </>
              </ul>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
