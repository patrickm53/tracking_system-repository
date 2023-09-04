"use client";
import React, { useState } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import classes from "./settings.module.css";
import SettingsProfile from "@/components/settings-profile/SettingsProfile";
import SettingsPassword from "@/components/settings-password/SettingsPassword";
import SettingsBooks from "@/components/settings-books/SettingsBooks";
import SettingsTeams from "@/components/settings-teams/SettingsTeams";
import SettingsEmail from "@/components/settings-email/SettingsEmail";

const Settings = (ctx) => {
  const [user, setUser] = useState("");
  const [navbarSelect, setNavbarSelect] = useState("profile");
  const router = useRouter();

  const handleSignOut = async (event) => {
    event.preventDefault();

    await signOut({ redirect: false });

    router.push("/");
  };

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
        {navbarSelect === "profile" ? <SettingsProfile /> : ""}
        {navbarSelect === "password" ? <SettingsPassword /> : ""}
        {navbarSelect === "books" ? <SettingsBooks /> : ""}
        {navbarSelect === "teams" ? <SettingsTeams /> : ""}
        {navbarSelect === "email" ? <SettingsEmail /> : ""}
      </div>
    </div>
    </div>
  );
};

export default Settings;
