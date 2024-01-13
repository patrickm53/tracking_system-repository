"use client";
import React, { useState } from "react";
import classes from "./register.module.css";
import { signIn } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import Image from "next/image";
import profilImage from "@/lib/profilImage";

const Register = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");
  const [birthday, setBirthday] = useState("");
  const [word, setWord] = useState("");
  const [story, setStory] = useState("");
  const [selectedImage, setSelectedImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username === "" || name === "" || email === "" || password === "") {
      toast.error("Fill all fields");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("location", location);
      formData.append("website", website);
      formData.append("birthday", birthday);
      formData.append("word", word);
      formData.append("story", story);
      formData.append("selectedImage", selectedImage);

      const res = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        body: formData,
      });

      console.log(await res.json());
      if (res.ok) {
        toast.success("Successfully registered the user");
        setTimeout(() => {
          signIn();
        }, 1000);
        return;
      } else {
        toast.error("Error occured while registering");
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const handleFileUpload = async (e) => {
  //   const file = e.target.files[0];
  //   const base64 = await convertToBase64(file);
  //   console.log(base64);
  //   setSelectedImage(base64);
  // };
  const handleFileUpload = (e) => {
    setSelectedImage(e.currentTarget.files?.[0]);
    // setSelectedImage(e.target.files?.[0]);
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.information}>
          <h1>BookWave</h1>
          <div className={classes.middle}>
            <h2>
              Kayıt Ol <br /> ve değişik kitap yorumlarını keşfet
            </h2>
            <h3>
              okuduğun kitapları paylaş, yorumları oku, yorum yap, topluluklara
              katıl.
            </h3>
          </div>
          <div className={classes.bottom}>
            <p>Okumadan geçen bir gün, yitirilmiş bir gündür.</p>
            <span>Paul Sartre</span>
          </div>
        </div>
        <div className={classes.register}>
          <h2>Kayıt Ol</h2>
          <h3>
            Hesabın var mı ?{" "}
            <button className={classes.register} onClick={() => signIn()}>
              Giriş Yap
            </button>
          </h3>
          <form onSubmit={handleSubmit}>
            <h4>İsim</h4>
            <input
              type="text"
              placeholder="İsim..."
              onChange={(e) => setName(e.target.value)}
            />
            <h4>Kullanıcı Adı</h4>
            <input
              type="text"
              placeholder="Kullanıcı adı..."
              onChange={(e) => setUsername(e.target.value)}
            />
            <h4>Email Adresi</h4>
            <input
              type="email"
              placeholder="Email..."
              onChange={(e) => setEmail(e.target.value)}
            />
            <h4>Şifre</h4>
            <input
              type="password"
              placeholder="Şifre..."
              onChange={(e) => setPassword(e.target.value)}
            />
            <h4>Profil Resmini Seç</h4>
            <input
              type="file"
              lable="image"
              name="myFile"
              id="file-upload"
              accept=".jpeg, .png, .jpg"
              onChange={handleFileUpload}
            />
            {/* <div className={classes.profilImage}>
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
            </div> */}
            <button className={classes.submitButton}>Register</button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;

// function convertToBase64(file) {
//   return new Promise((resolve, reject) => {
//     const fileReader = new FileReader();
//     fileReader.readAsDataURL(file);
//     fileReader.onload = () => {
//       resolve(fileReader.result);
//     };
//     fileReader.onerror = (error) => {
//       reject(error);
//     };
//   });
// }
