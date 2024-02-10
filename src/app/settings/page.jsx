"use client";
import React, { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import classes from "./settings.module.css";
import { fetchProfile, fetchProfileBook } from "@/app/api";
import background from "../../../public/background2.jpg";
import ImageNext from "next/image";
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
import settingLogoutImage from "../../../public/logout.png";
import { ReactCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const Settings = () => {
  const { data: session } = useSession();
  const [users, setUsers] = useState();
  const [navbarSelect, setNavbarSelect] = useState("selected");
  const [book, setBook] = useState();
  const router = useRouter();

  const handleSignOut = async (event) => {
    event.preventDefault();

    await signOut({ redirect: false });

    signIn();
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
  }, [session]);

  const handleButtonClick = (buttonName) => {
    setNavbarSelect(buttonName);
  };

  return (
    <div className={classes.body}>
      {navbarSelect === "selected" ? (
        <div className={classes.settingsFirstSelectCard}>
          <ul>
            <li onClick={() => handleButtonClick("profile")}>
              <ImageNext
                alt="setting profil"
                src={settingsProfileImage}
                className={classes.settingsProfileImage}
                width="100px"
                height="100px"
              />
              <h2>Profil</h2>
            </li>
            <li onClick={() => handleButtonClick("password")}>
              <ImageNext
                alt="setting paswword"
                src={settingsPasswordImage}
                className={classes.settingsPasswordImage}
                width="100px"
                height="100px"
              />
              <h2>Şifre</h2>
            </li>
            <li onClick={() => handleButtonClick("books")}>
              <ImageNext
                alt="setting book"
                src={settingsBookImage}
                className={classes.settingsBookImage}
                width="100px"
                height="100px"
              />
              <h2>Kitaplar</h2>
            </li>
            <li onClick={() => handleButtonClick("teams")}>
              <ImageNext
                alt="setting team"
                src={settingsTeamImage}
                className={classes.settingsTeamImage}
                width="100px"
                height="100px"
              />
              <h2>Takım</h2>
            </li>
            <li onClick={() => handleButtonClick("email")}>
              <ImageNext
                alt="setting email"
                src={settingsEmailImage}
                className={classes.settingsEmailImage}
                width="100px"
                height="100px"
              />
              <h2>Email</h2>
            </li>
            <li onClick={handleSignOut}>
              <ImageNext
                alt="setting logout"
                src={settingLogoutImage}
                className={classes.settingLogoutImage}
                width="100px"
                height="100px"
              />
              <h2>Çıkış Yap</h2>
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
  const initialCrop = {
    aspect: 1,
    unit: "px",
    width: 100,
    height: 100,
    x: 0,
    y: 0,
  };
  const [name, setName] = useState(user?.name);
  const [username, setUsername] = useState(user?.username);
  const [email, setEmail] = useState(user?.email);
  const [location, setLocation] = useState(user?.location);
  const [website, setWebsite] = useState(user?.website);
  const [birthday, setBirthday] = useState(user?.birthday);
  const [word, setWord] = useState(user?.word);
  const [story, setStory] = useState(user?.story);
  const [fileName, setFileName] = useState("");
  const [crop, setCrop] = useState(initialCrop);
  const [croppedImage, setCroppedImage] = useState(null);
  const [originalImage, setOriginalImage] = useState(null);
  const formattedDate = birthday
    ? new Date(birthday).toISOString().split("T")[0]
    : "";

  const handleDeleteImage = () => {
    setOriginalImage(null);
    setCroppedImage(null);
  };
  const handleSubmit = async () => {
    if (username === "" || name === "" || email === "") {
      toast.error("username and name and email cannot be empty");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("name", name);
      formData.append("username", username);
      formData.append("location", location);
      formData.append("website", website);
      formData.append("birthday", birthday);
      formData.append("word", word);
      formData.append("story", story);
      formData.append("newProfilImage", croppedImage);
      const res = await fetch("http://localhost:3000/api/register", {
        method: "PUT",
        body: formData,
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

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const fileName = file?.name || "cropperImage";
    setFileName(fileName);
    if (originalImage) {
      URL.revokeObjectURL(originalImage);
    }
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCroppedImage(null);
        setOriginalImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setOriginalImage(undefined);
    }
  };

  const handleCropComplete = (crop, percentCrop) => {
    const canvas = document.createElement("canvas");
    const imageObj = new Image();
    imageObj.src = originalImage;

    imageObj.onload = () => {
      const scaleX = imageObj.naturalWidth / 250;
      const scaleY = scaleX;

      const croppedAreaPixels = {
        x: Math.round(crop.x * scaleX),
        y: Math.round(crop.y * scaleY),
        width: Math.round(crop.width * scaleX),
        height: Math.round(crop.height * scaleY),
      };
      canvas.width = 250;
      canvas.height =
        (250 / croppedAreaPixels.width) * croppedAreaPixels.height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(
        imageObj,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        canvas.width,
        canvas.height
      );

      // Canvas'tan Blob elde et
      canvas.toBlob((blob) => {
        const croppedFile = new File([blob], fileName, {
          type: "image/jpeg",
        });
        // Kırpılmış dosyayı state'e kaydet
        setCroppedImage(croppedFile);
      }, "image/jpeg");
    };
  };

  return (
    <div className={classes.settingsProfile}>
      <div className={classes.backgroundImageContainer}>
        <ImageNext
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
          <ImageNext
            alt="profilImageSettings"
            className={classes.profilImage}
            src={`https://bookwave-profile-image.s3.eu-central-1.amazonaws.com/profileImage/${user?.profilImage}`}
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
              value={formattedDate}
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
          <div className={classes.profileImageSelected}>
            <h4>Profil Resmini Seç:</h4>
            {originalImage && (
              <button onClick={handleDeleteImage}>Resmi Sil</button>
            )}
          </div>
          <input
            type="file"
            lable="image"
            name="myFile"
            id="file-upload"
            accept=".jpeg, .png, .jpg"
            onChange={handleFileUpload}
          />
          <div className={classes.selectedAndCroppedImage}>
            {originalImage && (
              <div className={classes.uploadImage}>
                <ReactCrop
                  aspect={1}
                  crop={crop}
                  onChange={(c) => setCrop(c)}
                  onComplete={handleCropComplete}
                >
                  <img
                    src={originalImage}
                    alt={"ana resim setting"}
                    style={{
                      maxWidth: "250px",
                      minWidth: "250px",
                      width: "250px",
                      height: "auto",
                    }}
                  />
                </ReactCrop>
              </div>
            )}
            {croppedImage && (
              <div
                style={{
                  position: "relative",
                }}
              >
                <img
                  src={URL.createObjectURL(croppedImage)}
                  alt="Kırpılmış Resim Setting"
                  style={{ minWidth: "200px", maxWidth: "200px" }}
                />
              </div>
            )}
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
        <Link key={item._id} href={`settings/${item._id}`}>
          <SettingsBook book={item} />
        </Link>
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
