"use client";
import { useEffect, useState } from "react";
import classes from "./followPopup.module.css";
import {
  fetchFollowCount,
  fetchFollowSearch,
  fetchFollowUser,
  fetchFollowerViewData,
} from "@/app/api";
import { Box, Modal } from "@mui/material";
import Image from "next/image";
import { ProfileImageControl } from "../imageUndefined/ImageUndefined";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import Link from "next/link";
import { FadeLoader, PulseLoader } from "react-spinners";
import { useSession } from "next-auth/react";

const FollowCard = ({ user, action, handleFollow }) => {

  return (
    <div className={classes.followCard}>
      <div className={classes.followCardHeader}>
        <Link href={`/profile/${user._id}`}>
          <ProfileImageControl
            imageName={user.profilImage}
            widthImage={50}
            heightImage={50}
            altImage={user.username}
            className={classes.followCardImage}
            person={true}
          />
        </Link>
        <div className={classes.followCardInfo}>
          <p className={classes.followCardUsername}>{user.name}</p>
          <p className={classes.followCardName}>{user.username}</p>
        </div>
      </div>
      <div className={classes.followContainer}>
        {user?.follow === false ? (
          <button className={classes.followButtonPopup} onClick={() => handleFollow({ action: "follow", user: {user} })}>Takip Et</button>
        ) : user?.follow === true ? (
          <button className={classes.followingButtonPopup} onClick={() => handleFollow({ action: "unfollow", user: {user} })}>Takiptesin</button>
        ) : <></>}
      </div>
    </div>
  );
};

const ModalPopup = ({ closeModal, open, userId, action }) => {
  const { data: session } = useSession()
  const [search, setSearch] = useState(undefined);
  const [allUsers, setAllUsers] = useState(null);
  const [users, setUsers] = useState(null);
  const [actionType, setActionType] = useState(null);
  const [debouncedSearchBook, setDebouncedSearchBook] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  async function handleFollow({ action, user }) {
    if (action === "follow") {
      const updatedUsers = users.map(item => {
        if (item._id === user.user._id) {
          return { ...item, follow: true };
        }
        return item;
      });
      setUsers(updatedUsers);
    } else if (action === "unfollow") {
      const updatedUsers = users.map(item => {
        if (item._id === user.user._id) {
          return { ...item, follow: false };
        }
        return item;
      });
      setUsers(updatedUsers);
    }
    const token = session?.user?.accessToken;
    const response = await fetchFollowUser(
      token,
      session?.user?._id,
      user.user._id,
      action
    );
  }

  useEffect(() => {
    if (search?.length < 1) {
      setSearchLoading(false);
      setDebouncedSearchBook(null);
      setUsers(allUsers);
      return;
    }
    if (!search) {
      return;
    }
    setSearchLoading(true);
    const timeoutId = setTimeout(() => {
      setDebouncedSearchBook(search);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [search]);

  useEffect(() => {
    if (!debouncedSearchBook || !userId || !action) {
      return;
    }
    async function fetchSearch() {
      const response = await fetchFollowSearch(
        debouncedSearchBook,
        userId,
        action
      );
      setUsers(response);
      setSearchLoading(false);
    }
    fetchSearch();
  }, [debouncedSearchBook]);

  useEffect(() => {
    if (!userId || !action || !session) {
      return;
    }
    if (actionType !== action) {
      setUsers(null);
    }
    setLoading(true);
    async function fetchFollowerView() {
      const response = await fetchFollowerViewData(userId, action, session.user._id);
      setLoading(false)
      setUsers(response);
      setAllUsers(response);
      setActionType(action);
    }

    fetchFollowerView();
  }, [userId, action, session]);
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
            <PulseLoader size={10} color={"#bababa"} loading={searchLoading} />
          </div>
        </div>
        <div className={classes.componentContainer}>
          {users &&
            users.length > 0 &&
            users.map((user) => (
              <FollowCard key={user._id} user={user} action={action} handleFollow={handleFollow} />
            ))}
        </div>
        {loading && (
          <div className={classes.popupLoading}>
          <FadeLoader size={50} color={"#bababa"} loading={loading} />
        </div>
        )}
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
