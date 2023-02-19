import React from "react";
import { Box, Button, Divider, Modal, Typography } from "@mui/material";

const CategoryModal = ({ category, openModal, setOpenModal }) => {
  const [image, setImage] = React.useState(null);
  const [imagePreview, setImagePreview] = React.useState(null);
  const [baseImage, setBaseImage] = React.useState(null);
  
  const base64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
        setImagePreview(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  
  if(image){
    base64(image).then((data) => {
      setBaseImage(data);
    });
  }


  // React.useEffect(() => {
  //   if (category.image) {
  //     createImagePreview(category.image);
  //   } else {
  //     setImagePreview(null);
  //   }
  // }, [category.image]);




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
          {category.image
            ? <img src={category.image} alt={category.name} style={{ width: "100%" }} />
            : 
            <Box>
              <Typography variant="caption">
                No image available
              </Typography>
              <Divider/>
              <Button variant="contained" component="label">
                Pick Image
                <input type="file" hidden onChange={(e) => setImage(e.target.files[0])} />
              </Button>
            {imagePreview !== null && <img src={imagePreview} alt={category.name} style={{ width: "100%" }} />}
            </Box>
          }
      </Box>
      )}
    </Modal>
  );
};

export default CategoryModal;
