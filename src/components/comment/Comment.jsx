import React from "react";
import { useSession } from "next-auth/react";
import { format } from "timeago.js";
import person from "../../../public/person.jpg";
import { BsTrash } from "react-icons/bs";
import classes from "./comment.module.css";
import Image from "next/image";
import { fetchDeleteComment } from "@/app/api";

const Comment = ({ comment, setComments }) => {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  const handleDeleteComment = async () => {
    try {
      await fetchDeleteComment(token, comment?._id);

      setComments((prev) => {
        return [...prev].filter((c) => c?._id !== comment?._id);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.left}>
          <div className={classes.commentProfile}>
            <Image src={person} width="50" height="50" alt="" />
            <div className={classes.userData}>
              <h4>{comment?.authorId?.name}</h4>
              <span className={classes.timeago}>
                {format(comment?.createdAt)}
              </span>
            </div>
          </div>
          <span>{comment?.text}</span>
        </div>
        <div className={classes.right}>
          {session?.user?._id === comment?.authorId?._id && (
            <BsTrash
              className={classes.trashIcon}
              onClick={handleDeleteComment}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
