import React, { useEffect, useState } from "react";
import classes from "./suggestion.module.css";
import Link from "next/link";
import Image from "next/image";
import { ProfileImageControl } from "../imageUndefined/ImageUndefined";

const Suggestion = ({ user }) => {
  return (
    <div className={classes.followPerson}>
      <Link className={classes.wrapper} href={`/profile/${user._id}`}>
        <ProfileImageControl
          altImage="takipöneri"
          imageName={user?.profilImage}
          widthImage="45"
          heightImage="45"
          className={classes.followImage}
          person={true}
        />
        <div className={classes.followName}>
          <h2>{user.name}</h2>
          <h3>@{user.username}</h3>
        </div>
      </Link>
      <button>Takip Et</button>
    </div>
  );
};

export default Suggestion;
