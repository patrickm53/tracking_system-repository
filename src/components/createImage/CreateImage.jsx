"use client";
import { Modal, Box, Button } from "@mui/material";
import ImageNext from "next/image";
import { useState } from "react";
import classes from "./createImage.module.css";
import { ReactCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { AiFillCloseCircle, AiOutlineClose } from "react-icons/ai";
import { FaCheckCircle, FaCloudUploadAlt } from "react-icons/fa";
import { GrFormUpload } from "react-icons/gr";
import { BsUpload } from "react-icons/bs";
import { IoIosCloseCircle, IoMdCloseCircle } from "react-icons/io";

const ModalPopup = ({
  closeModal,
  open,
  aspectValue1,
  aspectValue2,
  setCroppedImage,
}) => {
  const initialCrop = {
    aspect: aspectValue1 / aspectValue2,
    unit: "px",
    width: 50 * aspectValue1,
    height: 50 * aspectValue2,
    x: 0,
    y: 0,
  };

  const [fileName, setFileName] = useState("");
  const [crop, setCrop] = useState(initialCrop);
  const [originalImage, setOriginalImage] = useState(null);

  const handleDeleteImage = () => {
    setOriginalImage(null);
    setCrop({ x: 0, y: 0 });
    setCroppedImage(null);
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
      const scaleX = imageObj.naturalWidth / 300;
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
        <div className={classes.closeIcon}>
          <AiOutlineClose onClick={closeModal} />
        </div>
        {!originalImage && (
          <>
            <div className={classes.choseDesc}>
              <BsUpload />
              <p>Resim Seç ve Kırp</p>
            </div>
            <div className={classes.inputImage}>
              <input
                type="file"
                id="selectedFile"
                name="myFile"
                accept=".jpeg, .png, .jpg"
                onChange={handleFileUpload}
                className={classes.selectedFile}
              />
              <span>Resim Seç</span>
            </div>
          </>
        )}
        {originalImage && (
          <div className={classes.uploadImage}>
            <ReactCrop
              aspect={aspectValue1 / aspectValue2}
              crop={crop}
              onChange={(c) => setCrop(c)}
              onComplete={handleCropComplete}
            >
              <ImageNext
                src={originalImage}
                alt={"kırma işlemi"}
                style={{
                  maxWidth: "300px",
                  minWidth: "300px",
                  width: "300px",
                  height: "auto",
                }}
                width={300}
                height={300}
              />
            </ReactCrop>
          </div>
        )}
        {originalImage && (
          <div className={classes.imageButton}>
            <button className={classes.deleteImage} onClick={handleDeleteImage}>
              Resmi Sil
            </button>
            <button className={classes.crossButton} onClick={closeModal}>
              Kırp
            </button>
          </div>
        )}
      </Box>
    </Modal>
  );
};

const CreateImage = ({ aspect1, aspect2, croppedImage, setCroppedImage }) => {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false); // Modalı kapat
  };

  const handleSelectImageModal = () => {
    setShowModal(true);
  };

  return (
    <>
      <button
        className={classes.imageSelectButton}
        onClick={handleSelectImageModal}
      >
        Resim Seç {croppedImage !== null && <FaCheckCircle />}
      </button>
      <ModalPopup
        closeModal={closeModal}
        open={showModal}
        aspectValue1={aspect1}
        aspectValue2={aspect2}
        setCroppedImage={setCroppedImage}
      />
    </>
  );
};

export default CreateImage;
