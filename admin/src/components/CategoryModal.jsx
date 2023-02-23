import React from "react";
import { Box, Button, Divider, Modal, Typography } from "@mui/material";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";

const CategoryModal = ({ category, openModal, setOpenModal }) => {
  const { token } = useAuthContext();
  const [image, setImage] = React.useState(null);
  const [imagePreview, setImagePreview] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const handleInputRef = React.useRef(null);
  console.log(category);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/v1/categories/${category._id}`,
        {
          image: image,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        setLoading(false);
        setOpenModal(false);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleImage = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImagePreview(reader.result);
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  console.log(image);

  return (
    <Modal open={openModal} onClose={() => setOpenModal(false)}>
      {category && (
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
          <Typography variant="h6" component="h2">
            {category.name}
          </Typography>
          <Typography variant="caption">
            {category.relatedProducts} products
          </Typography>
          {category.image ? (
            <img
              src={category.image.url}
              alt={category.name}
              style={{ width: "100%", height: "100%" }}
            />
          ) : (
            <Box>
              <Typography variant="caption">No image available</Typography>
              <Divider />
              <Button variant="contained" component="label">
                {image !== null ? "Change Image" : "Upload Image"}
                <input
                  type="file"
                  hidden
                  onChange={handleImage}
                  accept="image/*"
                  name="image"
                  ref={handleInputRef}
                />
              </Button>
              {imagePreview !== null && (
                <img
                  src={imagePreview}
                  alt={category.name}
                  style={{ width: "100%" }}
                />
              )}
            </Box>
          )}
          {imagePreview !== null && (
            <Button variant="contained" onClick={handleUpdate}>
              Update
            </Button>
          )}
          {loading && <h1>Loading...</h1>}
        </Box>
      )}
    </Modal>
  );
};

export default CategoryModal;
