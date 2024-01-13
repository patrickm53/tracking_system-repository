"use client";
import React, { useState } from "react";

const Community = () => {
  const [file, setFile] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("http://localhost:3000/api/s3-upload", {
        method: "POST",
        body: formData,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleFileUpload = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };

  return (
    <>
      <input
        type="file"
        lable="image"
        name="myFile"
        id="file-upload"
        accept=".jpeg, .png, .jpg"
        onChange={handleFileUpload}
      />
      <button onClick={handleSubmit}>Kayıt et</button>
    </>
  );
};

export default Community;
