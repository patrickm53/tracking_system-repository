import { Box, Button, Modal, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import classes from "./selectGenres.module.css";
import genresAll from "../../lib/genres";
import { GrSearch } from "react-icons/gr";
import { toast } from "react-toastify";

const ModalPopup = ({
  closeModal,
  open,
  selectedGenres,
  setSelectedGenres,
}) => {
  const [searchGenres, setSearchGenres] = useState([]);
  const [searchValue, setSearchValue] = useState();

  const handleDeleteGenres = async ({ index }) => {
    const updatedGenres = [...genres];
    updatedGenres.splice(index, 1);
    setSelectedGenres(updatedGenres);
  };

  useEffect(() => {
    if (searchValue?.length > 1) {
      const filteredGenres = genresAll.filter((genre) =>
        genre.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
      );
      // Filtrelenmiş kitapları setSearchGenres ile güncelle
      setSearchGenres(filteredGenres);
    } else {
      setSearchGenres(genresAll);
    }
  }, [searchValue]);

  const handleItemClick = (clickedItem) => {
    if (selectedGenres.includes(clickedItem)) {
      setSelectedGenres(
        selectedGenres.filter((genre) => genre !== clickedItem)
      );
    } else if (selectedGenres.length >= 6) {
      toast.error("6'dan fazla tür seçilemez!!!");
    } else {
      setSelectedGenres([...selectedGenres, clickedItem]);
    }
  };
  return (
    <Modal
      open={open}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className={classes.modal}
    >
      <Box className={classes.popup}>
        <Box
          display="flex"
          gap="20px"
          justifyContent="center"
          alignItems="center"
          m="20px 0"
        >
          <Typography
            whiteSpace="nowrap"
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            Tür Seç
          </Typography>
          <div className={classes.search}>
            <input
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Tür Ara"
            />
            <div className={classes.searchIcon}>
              <GrSearch />
            </div>
          </div>
        </Box>
        <Box className={classes.genresAll}>
          <ul>
            {searchGenres?.map((item, index) => (
              <li
                key={index}
                onClick={() => handleItemClick(item)}
                className={
                  selectedGenres.includes(item) ? classes.activeGenres : ""
                }
              >
                {item}
              </li>
            ))}
          </ul>
        </Box>
      </Box>
    </Modal>
  );
};

const SelectGenres = ({ selectedGenres, setSelectedGenres }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectValue, setSelectValue] = useState("");

  const closeModal = () => {
    setShowModal(false); // Modalı kapat
  };

  const handleSelectGenres = () => {
    setShowModal(true);
  };

  useEffect(() => {
    setSelectValue(selectedGenres.length);
  }, [selectedGenres]);

  return (
    <>
      <button onClick={handleSelectGenres}>Tür Seç ({selectValue})</button>
      <ModalPopup
        closeModal={closeModal}
        open={showModal}
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
      />
    </>
  );
};

export default SelectGenres;
