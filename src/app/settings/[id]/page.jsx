"use client";
import React, { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import classes from "./settings.module.css";
import { fetchProfile } from "@/app/api";
import background from "../../../../public/background2.jpg";
import Image from "next/image";

const Settings = (ctx) => {
  const [user, setUser] = useState("");
  const [navbarSelect, setNavbarSelect] = useState("profile");
  const router = useRouter();

  const handleSignOut = async (event) => {
    event.preventDefault();

    await signOut({ redirect: false });

    router.push("/");
  };

  useEffect(() => {
    async function fetchProfiles() {
      const id = ctx.params.id;
      const data = await fetchProfile(id);
      setUser(data);
    }
    fetchProfiles();
  }, []);

  const handleButtonClick = (buttonName) => {
    setNavbarSelect(buttonName);
  };

  return (
    <div className={classes.body}>
      <div className={classes.container}>
        <div className={classes.navbar}>
          <h2>Ayarlar</h2>
          <ul>
            <li
              className={navbarSelect === "profile" ? classes.active : ""}
              onClick={() => handleButtonClick("profile")}
            >
              <a>Profil</a>
            </li>
            <li
              className={navbarSelect === "password" ? classes.active : ""}
              onClick={() => handleButtonClick("password")}
            >
              <a>Şifre</a>
            </li>
            <li
              className={navbarSelect === "books" ? classes.active : ""}
              onClick={() => handleButtonClick("books")}
            >
              <a>Kitaplar</a>
            </li>
            <li
              className={navbarSelect === "teams" ? classes.active : ""}
              onClick={() => handleButtonClick("teams")}
            >
              <a>Takım</a>
            </li>
            <li
              className={navbarSelect === "email" ? classes.active : ""}
              onClick={() => handleButtonClick("email")}
            >
              <a>Email</a>
            </li>
          </ul>
          <Link href="/" className={classes.logout}>
            <button onClick={handleSignOut}>Çıkış Yap</button>
          </Link>
        </div>
        <div className={classes.wrapper}>
          {navbarSelect === "profile" ? <SettingsProfile user={user} /> : ""}
          {navbarSelect === "password" ? <SettingsPassword /> : ""}
          {navbarSelect === "books" ? <SettingsBooks /> : ""}
          {navbarSelect === "teams" ? <SettingsTeams /> : ""}
          {navbarSelect === "email" ? <SettingsEmail /> : ""}
        </div>
      </div>
    </div>
  );
};

const SettingsProfile = ({ user }) => {
  return (
    <div className={classes.settingsProfile}>
      <div className={classes.backgroundImageContainer}>
        <Image
          alt="backgroundSettings"
          className={classes.backgroundImage}
          src={background}
        />
      </div>
      <h3>{user.username}</h3>
    </div>
  );
};

const SettingsPassword = () => {
  return <div>SettingsPassword</div>;
};

const SettingsBooks = () => {
  return <div>SettingsBooks</div>;
};

const SettingsTeams = () => {
  return <div>SettingsTeams</div>;
};

const SettingsEmail = () => {
  return <div>SettingsEmail</div>;
};

export default Settings;
