import React from "react";
import classes from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.wrapper}>
        <div className={classes.col}>
          <h2>Uygulama Hakkında</h2>
          <p>
            Bu uygulama okuduğun kitapları sisteme kayıt edebilmeni ve o
            kitaplar hakkında yorumunu ve puanlamanı yapabilmeni sağlayan bir
            sistemdir.
          </p>
        </div>
        <div className={classes.col}>
          <h2>İletişim</h2>
          <span>Telefon +90 931 453 32 32</span>
          <span>Instagram: seyityahya</span>
          <span>Github: seyityahya</span>
        </div>
        <div className={classes.col}>
          <h2>Konum</h2>
          <span>Kıta: Europe</span>
          <span>Ülke: Turkey</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
