import React, { useEffect, useState } from "react";
import classes from "./suggestion.module.css";
import person from "../../../public/person.jpg";
import Image from "next/image";

const Suggestion = ({ user }) => {
  return (
    <div className={classes.followPerson}>
      <span>
        <Image
          className={classes.followImage}
          alt="takipöneri"
          src={person}
          width="45"
          height="45"
        />
        <div className={classes.followName}>
          <a>Deniz Taş</a>
          <h3>@deniz8255</h3>
        </div>
      </span>
      <button>Takip Et</button>
    </div>
  );
};

export default Suggestion;
