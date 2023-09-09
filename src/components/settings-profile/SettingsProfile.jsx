import React from "react";
import Image from "next/image";
import { background } from "../../../public/background2.jpg";
import classes from "./settingsProfile.module.css";

const SettingsProfile = ({ user }) => {
  return (
    <div>
      <div>
        <Image
          className={classes.backgroundImage}
          alt="background"
          src={background}
          heigh={100}
        />
      </div>
    </div>
  );
};

export default SettingsProfile;
