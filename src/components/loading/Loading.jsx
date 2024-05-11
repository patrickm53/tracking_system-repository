import { Box } from "@mui/material";
import React from "react";
import { ClipLoader, FadeLoader, PulseLoader } from "react-spinners";

function Loading() {
  return (
    <Box
      display="flex"
      position="absolute"
      width="100%"
      height="100vh"
      bgcolor="rgba(0, 0, 0, 0.5)"
      justifyContent="center"
      alignItems="center"
      zIndex="9999"
    >
      <FadeLoader size={50} color={"#bababa"} loading={true} />
    </Box>
  );
}

export default Loading;
