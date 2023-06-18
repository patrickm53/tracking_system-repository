import Image from "next/image";
import React from "react";
import classes from "./profilePost.module.css";
import person from "../../../public/person.jpg";

const ProfilePost = ({ key, book }) => {
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.imageContainer}>
          <Image
            alt="profilPerson"
            src={person}
            width="50"
            height="50"
            className={classes.profilPerson}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePost;
