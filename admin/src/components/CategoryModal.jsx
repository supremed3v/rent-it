import React from "react";
import { Box, Modal } from "@mui/material";

const CategoryModal = ({ category, openModal, setOpenModal }) => {
  console.log(category);
  return (
    <Modal open={openModal} onClose={() => setOpenModal(false)}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <h1>{category?.name}</h1>
      </Box>
    </Modal>
  );
};

export default CategoryModal;
