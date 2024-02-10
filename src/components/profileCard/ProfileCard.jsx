import React from "react";
import classes from "./profileCard.module.css";
import Image from "next/image";
import { AiFillBook } from "react-icons/ai";
import Link from "next/link";

const ProfileCard = ({ key, user }) => {
  return (
    <div className={classes.body}>
      <div className={classes.container}>
        <div className={classes.up}>
          <Link
            className={classes.imageContainer}
            href={`/profile/${user._id}`}
          >
            <Image
              alt="profilCard Profil Image"
              className={classes.image}
              src={`https://bookwave-profile-image.s3.eu-central-1.amazonaws.com/profileImage/${user?.ProfileImage}`}
              width="100"
              height="100"
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
