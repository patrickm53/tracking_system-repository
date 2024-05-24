"use client";
import { useEffect, useState } from "react";
import classes from "./followPopup.module.css";
import { fetchFollowCount } from "@/app/api";
import { Box, Modal } from "@mui/material";

const ModalPopup = ({ closeModal, open, userId }) => {
  return (
    <Modal
      open={open}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className={classes.modal}
    >
      <Box
        className={classes.popup}
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        Deneme
      </Box>
    </Modal>
  );
};

const FollowCount = ({ userId }) => {
  const [showModal, setShowModal] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [commentCount, setcommentCount] = useState(0);
  useEffect(() => {
    if (!userId) {
      return;
    }
    async function fetchFollowCountGet() {
      const response = await fetchFollowCount(userId);
      setFollowerCount(response.followers);
      setFollowingCount(response.following);
      setcommentCount(response.commentCount);
    }
    fetchFollowCountGet();
  }, [userId]);

  const closeModal = () => {
    setShowModal(false); // Modalı kapat
  };

  const handleSelectFollowModal = () => {
    setShowModal(true);
  };
  if (!userId) {
    return <></>;
  }

  return (
    <>
      <div className={classes.followContainer}>
        <p className={classes.followButton}>
          <span>{commentCount}</span> gönderi
        </p>
        <button
          className={classes.followButton}
          onClick={handleSelectFollowModal}
        >
          <span>{followerCount}</span> takipçi
        </button>
        <button
          className={classes.followButton}
          onClick={handleSelectFollowModal}
        >
          <span>{followingCount}</span> takip
        </button>
      </div>
      <ModalPopup closeModal={closeModal} open={showModal} userId={userId} />
    </>
  );
};

export default FollowCount;
