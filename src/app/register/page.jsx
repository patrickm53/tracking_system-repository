"use client";
import React, { useEffect, useState } from "react";
import classes from "./register.module.css";
import { signIn } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ReactCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import ImageNext from "next/image";
import CreateImage from "@/components/createImage/CreateImage";

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
  const [croppedImage, setCroppedImage] = useState(null);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (username === "" || name === "" || email === "" || password.length < 6) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [username, name, email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);

    if (username === "" || name === "" || email === "" || password === "") {
      toast.error("Fill all fields");
      setDisabled(false);
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      setDisabled(false);
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
      formData.append("selectedImage", croppedImage);

      const res = await fetch("/api/register", {
        method: "POST",
        body: formData,
      });

      const finishMessage = await res.json();
      if (res.ok) {
        toast.success("Successfully registered the user");
        setTimeout(() => {
          signIn();
        }, 1000);
        return;
      } else {
        toast.error(finishMessage);
        setDisabled(false);
        return;
      }
    } catch (error) {
      toast.error("Error occured while registering");
      console.log(error);
    }
    setDisabled(false);
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.information}>
          <h1>BookWave</h1>
          <div className={classes.middle}>
            <h2>
              Kayıt Ol ve <br /> kitap yorumlarını keşfet
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
          <div className={classes.form}>
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
            <CreateImage
              aspect1={2}
              aspect2={2}
              croppedImage={croppedImage}
              setCroppedImage={setCroppedImage}
            />
            {croppedImage && (
              <div
                style={{
                  position: "relative",
                  maxWidth: "150px",
                }}
              >
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "grey",
                    margin: "5px 0",
                  }}
                >
                  Kaydedilecek Resim
                </p>
                <ImageNext
                  src={URL.createObjectURL(croppedImage)}
                  alt="Kırpılmış Resim"
                  width={250}
                  height={250}
                />
              </div>
            )}
            <button
              disabled={disabled}
              className={classes.submitButton}
              onClick={handleSubmit}
            >
              Kayıt Ol
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
