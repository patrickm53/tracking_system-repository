"use client";
import { useEffect, useState } from "react";
import classes from "./followPopup.module.css";
import { fetchFollowCount, fetchFollowerViewData } from "@/app/api";
import { Box, Modal } from "@mui/material";
import Image from "next/image";
import { ProfileImageControl } from "../imageUndefined/ImageUndefined";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";

const FollowCard = ({ user, action }) => {
  return (
    <div className={classes.followCard}>
      <div className={classes.followCardHeader}>
        <ProfileImageControl
          imageName={user.profilImage}
          widthImage={50}
          heightImage={50}
          altImage={user.username}
          className={classes.followCardImage}
          person={true}
        />
        <div className={classes.followCardInfo}>
          <p className={classes.followCardUsername}>{user.username}</p>
          <p className={classes.followCardName}>{user.name}</p>
        </div>
      </div>
      <div className={classes.followContainer}>
        {action === "followers" ? (
          <button className={classes.followButtonPopup}>Takip Et</button>
        ) : (
          <button className={classes.followingButtonPopup}>Takiptesin</button>
        )}
      </div>
    </div>
  );
};

const ModalPopup = ({ closeModal, open, userId, action }) => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState(null);
  const [actionType, setActionType] = useState(null);
  useEffect(() => {
    if (!userId || !action) {
      return;
    }
    if (actionType !== action) {
      setUsers(null);
    }
    console.log("ilerledi");
    async function fetchFollowerView() {
      const response = await fetchFollowerViewData(userId, action);
      setUsers(response.following || response.followers);
      setActionType(action);
    }
    fetchFollowerView();
  }, [userId, action]);
  return (
    <Modal
      open={open}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className={classes.modal}
    >
      <Box className={classes.popup} display="flex" flexDirection="column">
        <div className={classes.followNavbar}>
          <div className={classes.closeIcon}>
            <AiOutlineClose onClick={closeModal} />
          </div>
          <div className={classes.navbarHeader}>{action}</div>
          <div className={classes.searchBox}>
            <AiOutlineSearch className={classes.searchIcons} />
            <input
              type="text"
              value={search}
              placeholder="Ara..."
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
        </div>
        <div className={classes.componentContainer}>
          {users &&
            users.length > 0 &&
            users.map((user) => (
              <FollowCard key={user._id} user={user} action={action} />
            ))}
        </div>
      </Box>
    </Modal>
  );
};

const FollowCount = ({ userId }) => {
  const [showModal, setShowModal] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [commentCount, setcommentCount] = useState(0);
  const [action, setAction] = useState(null);
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

  const handleSelectFollowModal = ({ action }) => {
    setAction(action);
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
          onClick={(e) => handleSelectFollowModal({ action: "followers" })}
        >
          <span>{followerCount}</span> takipçi
        </button>
        <button
          className={classes.followButton}
          onClick={(e) => handleSelectFollowModal({ action: "following" })}
        >
          <span>{followingCount}</span> takip
        </button>
      </div>
      <ModalPopup
        closeModal={closeModal}
        open={showModal}
        userId={userId}
        action={action}
      />
    </>
  );
};

export default FollowCount;
