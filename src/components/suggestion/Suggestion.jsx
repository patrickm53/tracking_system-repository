import React, { useEffect, useState } from "react";
import classes from "./suggestion.module.css";
import Link from "next/link";
import Image from "next/image";
import { ProfileImageControl } from "../imageUndefined/ImageUndefined";
import { fetchFollowUser } from "@/app/api";

const Suggestion = ({ user, session }) => {
  const [followControl, setFollowControl] = useState(false);
  async function handleFollow({ action }) {
    if (action === "follow") {
      setFollowControl(true);
    } else if (action === "unfollow") {
      setFollowControl(false);
    }
    const token = session?.user?.accessToken;
    const response = await fetchFollowUser(
      token,
      session?.user?._id,
      user._id,
      action
    );
  }
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
      {followControl === false ? (
        <button
          className={classes.followButton}
          onClick={() => handleFollow({ action: "follow" })}
        >
          Takip Et
        </button>
      ) : followControl === true ? (
        <button
          onClick={() => handleFollow({ action: "unfollow" })}
          className={classes.followingButton}
        >
          Takiptesin
        </button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Suggestion;
