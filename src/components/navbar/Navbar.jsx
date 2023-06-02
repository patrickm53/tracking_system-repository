"use client";
import Link from "next/link";
import React from "react";
import classes from "./navbar.module.css";

const Navbar = () => {
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2 className={classes.left}>
          <Link href="/">BlogApp</Link>
        </h2>
        <ul className={classes.right}>
          <>
            <button className={classes.login}>Log in</button>
            <Link href="/register">Register</Link>
          </>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
