import React from "react";
import classes from "./profileCard.module.css";
import Image from "next/image";
import { AiFillBook } from "react-icons/ai";
import Link from "next/link";
import { ProfileImageControl } from "../imageUndefined/ImageUndefined";

const ProfileCard = ({ id, user }) => {
  return (
    <div className={classes.body}>
      <div className={classes.container}>
        <div className={classes.up}>
          <Link
            className={classes.imageContainer}
            href={`/profile/${user._id}`}
          >
            <ProfileImageControl
              altImage={id}
              imageName={user?.profilImage}
              widthImage="100"
              heightImage="100"
              className={classes.image}
            />
          </Link>
          <div className={classes.information}>
            <h2>
              {user.name}
              <AiFillBook />
            </h2>
            <h3>@{user.username}</h3>
            <p>
              Takipçi: <span>12</span>
            </p>
            <p>
              Paylaşım: <span>16</span>
            </p>
          </div>
        </div>
        <div className={classes.follows}>
          <button>Takip Et</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
