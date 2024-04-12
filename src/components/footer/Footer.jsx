import Link from "next/link";
import React from "react";
import classes from "./footer.module.css";
import {
  TiSocialFacebook,
  TiSocialInstagram,
  TiSocialTwitter,
} from "react-icons/ti";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.wrapper}>
        <div className={classes.col}>
          <p>Kitapsız yaşamak kör, sağır, dilsiz yaşamaktır</p>
          <span>Mustafa Kemal Atatürk</span>
        </div>
        <div className={classes.socialMedia}>
          <Link href={"https://www.facebook.com"}>
            <TiSocialFacebook />
          </Link>
          <Link href={"https://www.instagram.com"}>
            <TiSocialInstagram />
          </Link>
          <Link href={"https://www.twitter.com"}>
            <TiSocialTwitter />
          </Link>
        </div>
      </div>
      <div className={classes.bottomFooter}>
        <p>BOOKSMENT.COM</p>
      </div>
    </footer>
  );
};

export default Footer;
