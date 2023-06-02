import React from "react";
import classes from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.wrapper}>
        <div className={classes.col}>
          <h2>About the App</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae,
            modi velit. Error, pariatur alias amet fugiat, labore minima maxime
            nihil similique quas, magni earum cumque atque officiis explicabo
            exercitationem. Quo.
          </p>
        </div>
        <div className={classes.col}>
          <h2>Contact</h2>
          <span>Phone +90 931 453 32 32</span>
          <span>Instagram: seyityahya</span>
          <span>Github: seyityahya</span>
        </div>
        <div className={classes.col}>
          <h2>Location</h2>
          <span>Continent: Europe</span>
          <span>Country: Turkey</span>
          <span>Current Location: Turkey</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
