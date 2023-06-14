import React from "react";
import classes from "./profilePost.module.css";

const ProfilePost = ({ key, book }) => {
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>{book.kitap_ismi}</div>
    </div>
  );
};

export default ProfilePost;
