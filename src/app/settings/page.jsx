"use client";
import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import classes from "./settings.module.css";
import { fetchProfile, fetchProfileBook } from "@/app/api";
import background from "../../../public/background2.jpg";
import Image from "next/image";
import { PiCameraRotate } from "react-icons/pi";
import profilImage from "@/lib/profilImage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SettingsBook from "@/components/settingsBook/SettingsBook";
import settingsProfileImage from "../../../public/settings-profile.jpg";
import settingsPasswordImage from "../../../public/settings-password.png";
import settingsBookImage from "../../../public/settings-book.jpg";
import settingsTeamImage from "../../../public/settings-team.jpg";
import settingsEmailImage from "../../../public/settings-email.jpg";

const Settings = () => {
  const { data: session } = useSession();
  const [users, setUsers] = useState();
  const [navbarSelect, setNavbarSelect] = useState("selected");
  const [book, setBook] = useState();
  const router = useRouter();

  const handleSignOut = async (event) => {
    event.preventDefault();

    await signOut({ redirect: false });

    router.push("/");
  };

  useEffect(() => {
    async function fetchProfiles() {
      const id = session?.user?._id;
      const data = await fetchProfile(id);
      setUsers(data);
    }
    async function fetchBooks() {
      const id = session?.user?._id;
      const data = await fetchProfileBook(id);
      setBook(data);
    }
    fetchProfiles();
    fetchBooks();
  }, []);

  const handleButtonClick = (buttonName) => {
    setNavbarSelect(buttonName);
  };

  return (
    <div className={classes.body}>
      {navbarSelect === "selected" ? (
        <div className={classes.settingsFirstSelectCard}>
          <ul>
            <li onClick={() => handleButtonClick("profile")}>
              <Image
                alt="deneme4324"
                src={settingsProfileImage}
                className={classes.settingsProfileImage}
                width="100px"
                height="100px"
              />
              <h2>Profil</h2>
            </li>
            <li onClick={() => handleButtonClick("password")}>
              <Image
                alt="deneme4324"
                src={settingsPasswordImage}
                className={classes.settingsPasswordImage}
                width="100px"
                height="100px"
              />
              <h2>Şifre</h2>
            </li>
            <li onClick={() => handleButtonClick("books")}>
              <Image
                alt="deneme4324"
                src={settingsBookImage}
                className={classes.settingsBookImage}
                width="100px"
                height="100px"
              />
              <h2>Kitaplar</h2>
            </li>
            <li onClick={() => handleButtonClick("teams")}>
              <Image
                alt="deneme4324"
                src={settingsTeamImage}
                className={classes.settingsTeamImage}
                width="100px"
                height="100px"
              />
              <h2>Takım</h2>
            </li>
            <li onClick={() => handleButtonClick("email")}>
              <Image
                alt="deneme4324"
                src={settingsEmailImage}
                className={classes.settingsEmailImage}
                width="100px"
                height="100px"
              />
              <h2>Email</h2>
            </li>
          </ul>
        </div>
      ) : (
        <>
          <div className={classes.container}>
            <div className={classes.navbar}>
              <h2>Ayarlar</h2>
              <ul>
                <li
                  className={navbarSelect === "profile" ? classes.active : ""}
                  onClick={() => handleButtonClick("profile")}
                >
                  <a>Profil</a>
                </li>
                <li
                  className={navbarSelect === "password" ? classes.active : ""}
                  onClick={() => handleButtonClick("password")}
                >
                  <a>Şifre</a>
                </li>
                <li
                  className={navbarSelect === "books" ? classes.active : ""}
                  onClick={() => handleButtonClick("books")}
                >
                  <a>Kitaplar</a>
                </li>
                <li
                  className={navbarSelect === "teams" ? classes.active : ""}
                  onClick={() => handleButtonClick("teams")}
                >
                  <a>Takım</a>
                </li>
                <li
                  className={navbarSelect === "email" ? classes.active : ""}
                  onClick={() => handleButtonClick("email")}
                >
                  <a>Email</a>
                </li>
              </ul>
              <Link href="/" className={classes.logout}>
                <button onClick={handleSignOut}>Çıkış Yap</button>
              </Link>
            </div>
            <div className={classes.wrapper}>
              {navbarSelect === "profile" ? (
                <SettingsProfile user={users} />
              ) : (
                ""
              )}
              {navbarSelect === "password" ? <SettingsPassword /> : ""}
              {navbarSelect === "books" ? <SettingsBooks book={book} /> : ""}
              {navbarSelect === "teams" ? <SettingsTeams /> : ""}
              {navbarSelect === "email" ? <SettingsEmail /> : ""}
            </div>
          </div>
          <ToastContainer />
        </>
      )}
    </div>
  );
};

export default Settings;

const SettingsProfile = ({ user }) => {
  const [name, setName] = useState(user?.name);
  const [username, setUsername] = useState(user?.username);
  const [email, setEmail] = useState(user?.email);
  const [location, setLocation] = useState(user?.location);
  const [website, setWebsite] = useState(user?.website);
  const [birthday, setBirthday] = useState(user?.birthday);
  const [word, setWord] = useState(user?.word);
  const [story, setStory] = useState(user?.story);
  const [selectedImage, setSelectedImage] = useState(user?.profilImage);

  const handleSubmit = async () => {
    if (username === "" || name === "" || email === "") {
      toast.error("username and name and email cannot be empty");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/register", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({
          name,
          username,
          email,
          location,
          website,
          birthday,
          word,
          story,
          profilImage: selectedImage,
        }),
      });
      console.log(await res.json());
      if (res.ok) {
        toast.success("Successfully updated profile");
        return;
      } else {
        toast.error("Error occured while updated");
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.settingsProfile}>
      <div className={classes.backgroundImageContainer}>
        <Image
          alt="backgroundSettings"
          className={classes.backgroundImage}
          src={background}
        />
        <div className={classes.backgroundEdit}>
          <PiCameraRotate />
        </div>
      </div>
      <div className={classes.profileUp}>
        <div className={classes.profilImageContainer}>
          <Image
            alt="profilImageSettings"
            className={classes.profilImage}
            src={user?.profilImage}
            width={150}
            height={150}
          />
          <div className={classes.profilExplanation}>
            <h2>Profil</h2>
            <h3>profil bilgileri ve fotografını güncelle</h3>
          </div>
        </div>
        <div className={classes.saveButton}>
          <button>İptal</button>
          <button onClick={() => handleSubmit()}>Kaydet</button>
        </div>
      </div>
      <div className={classes.information}>
        <form>
          <span>
            <h4>İsim:</h4>
            <input
              value={name}
              type="text"
              placeholder="İsim..."
              onChange={(e) => setName(e.target.value)}
            />
          </span>
          <span>
            <h4>Kullanıcı Adı:</h4>
            <input
              value={username}
              type="text"
              placeholder="Kullanıcı adı..."
              onChange={(e) => setUsername(e.target.value)}
            />
          </span>
          <span>
            <h4>Email Adresi:</h4>
            <input
              value={email}
              type="email"
              placeholder="Email..."
              onChange={(e) => setEmail(e.target.value)}
            />
          </span>
          <span>
            <h4>Konum:</h4>
            <input
              value={location}
              type="text"
              placeholder="Konum..."
              onChange={(e) => setLocation(e.target.value)}
            />
          </span>
          <span>
            <h4>Website:</h4>
            <input
              value={website}
              type="url"
              placeholder="Website..."
              onChange={(e) => setWebsite(e.target.value)}
            />
          </span>
          <span>
            <h4>Doğum Tarihi:</h4>
            <input
              value={birthday}
              type="date"
              placeholder="Doğum Tarihi..."
              onChange={(e) => setBirthday(e.target.value)}
            />
          </span>
          <span>
            <div>
              <h4>Profil Sözü:</h4>
              <h5>(Maksimum 21 karekter)</h5>
            </div>
            <input
              value={word}
              type="text"
              placeholder="Profil Sözü Girin..."
              onChange={(e) => setWord(e.target.value)}
            />
          </span>
          <span className={classes.textarea}>
            <h4>Hikayen:</h4>
            <textarea
              value={story}
              type="text"
              placeholder="Hikayen..."
              onChange={(e) => setStory(e.target.value)}
            />
          </span>
          <h4>Profil Resmini Seç:</h4>
          <div className={classes.selectedProfilImage}>
            {profilImage.map((image, index) => (
              <Image
                alt={`resim ${index + 1}`}
                src={image.src}
                width="60"
                height="60"
                className={`${classes.images} ${
                  selectedImage === image.src ? classes.active : ""
                }`}
                onClick={() => setSelectedImage(image.src)}
              />
            ))}
          </div>
        </form>
      </div>
    </div>
  );
};

const SettingsPassword = () => {
  return (
    <div>
      <span>
        <h4>Şifren:</h4>
        <input type="password" placeholder="Şifren..." />
      </span>
      <span>
        <h4>Yenı Şifre:</h4>
        <input type="password" placeholder="Yeni Şifren..." />
      </span>
    </div>
  );
};

const SettingsBooks = ({ book }) => {
  return (
    <div className={classes.settingsBooks}>
      {book.map((item) => (
        <SettingsBook book={item} />
      ))}
    </div>
  );
};

const SettingsTeams = () => {
  return <div>SettingsTeams</div>;
};

const SettingsEmail = () => {
  return <div>SettingsEmail</div>;
};
