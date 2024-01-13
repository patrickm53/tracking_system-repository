import React, { useEffect, useState } from "react";
import classes from "./suggestion.module.css";
import Link from "next/link";
import Image from "next/image";

const Suggestion = ({ user }) => {
  return (
    <div className={classes.followPerson}>
      <Link className={classes.wrapper} href={`/profile/${user._id}`}>
        <Image
          className={classes.followImage}
          alt="takipöneri"
          src={`https://bookwave-profile-image.s3.eu-central-1.amazonaws.com/profileImage/${user?.profilImage}`}
          width="45"
          height="45"
        />
        <div className={classes.followName}>
          <a>{user.name}</a>
          <h3>@{user.username}</h3>
        </div>
      </Link>
      <button>Takip Et</button>
    </div>
  );
};

export default Suggestion;
