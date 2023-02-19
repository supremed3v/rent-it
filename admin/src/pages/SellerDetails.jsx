import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Typography,
  Box,
  Grid,
  Divider,
  Button,
  Modal,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
function getSellerProducts(token, sellerId) {
  return axios
    .get(`http://localhost:5000/api/v1/get-rented-products/${sellerId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data.products) // return the data
    .catch((err) => console.log(err));
}
const SellerDetails = () => {
  const navigate = useNavigate();
  const [sellerProducts, setSellerProducts] = useState([]);
  const { token } = useAuthContext();
  const { state } = useLocation();
  const { seller } = state;
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState({
    to: seller.email,
    subject: "",
    message: "",
  });

  useEffect(() => {
    getSellerProducts(token, seller._id).then((data) => {
      setSellerProducts(data);
    });
  }, [token, seller._id]);
  console.log(sellerProducts);
  return (
    <div>
      <Grid
        container
        spacing={2}
        sx={{
          mb: 2,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Grid item xs={12} md={6}>
          <Typography variant="h1">Seller Details</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button variant="outlined" onClick={() => setOpen(true)}>
            Send Message to Seller
          </Button>
        </Grid>
      </Grid>
      <Box sx={{ mb: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Name</Typography>
            <Typography variant="body1">{seller.name}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Email</Typography>
            <Typography variant="body1">{seller.email}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Stripe Account</Typography>
            <Typography variant="body1">{seller.stripe_account_id}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Joined on</Typography>
            <Typography variant="body1">
              {seller.createdAt.slice(0, 10)}
            </Typography>
          </Grid>
          {seller.verifySellerIdCard ? (
            <Grid item xs={12} md={6}>
              <Typography variant="h6">ID Card</Typography>
              <img
                src={seller.verifySellerIdCard.url}
                alt="ID Card"
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "5px",
                }}
              />
            </Grid>
          ) : (
            <Typography variant="h6">ID Card not uploaded</Typography>
          )}
          {seller.verifySellerImage ? (
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Picture</Typography>
              <img
                src={seller.verifySellerImage.url}
                alt="Seller"
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "5px",
                }}
              />
            </Grid>
          ) : (
            <Typography variant="h6">Image not uploaded</Typography>
          )}
        </Grid>
        <Divider
          sx={{
            my: 2,
          }}
        />
        <Box>
          <Typography variant="h6">Products</Typography>
          <Grid container spacing={2}>
            {sellerProducts.length > 0 ? (
              sellerProducts.map((product) => (
                <Grid item xs={4} md={4} key={product._id}>
                  <Box
                    sx={{
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      p: 2,
                      mb: 2,
                      cursor: "pointer",
                      "&:hover": {
                        transform: "scale(1.02)",
                        boxShadow: "0 0 10px #fff",
                      },
                      transition: "all 0.3s ease-in-out",
                      mt: 2,
                    }}
                    onClick={() => navigate(`/product/${product._id}`)}
                  >
                    <Typography variant="h6">{product.name}</Typography>
                    <Typography variant="body1">
                      {product.description}
                    </Typography>
                    <Typography variant="body1">{product.price}</Typography>
                  </Box>
                </Grid>
              ))
            ) : (
              <Typography variant="body1">No products</Typography>
            )}
          </Grid>
        </Box>
        <Divider
          sx={{
            my: 2,
          }}
        />
        <Typography variant="h6">Orders</Typography>
        <Grid container spacing={2}>
          {seller.orders.length > 0 ? (
            seller.orders.map((order) => (
              <Grid item xs={12} md={6} key={order._id}>
                <Box
                  sx={{
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    p: 2,
                    mb: 2,
                    cursor: "pointer",
                    "&:hover": {
                      transform: "scale(1.02)",
                      boxShadow: "0 0 10px #fff",
                    },
                    transition: "all 0.3s ease-in-out",
                    mt: 2,
                  }}
                  onClick={() => navigate(`/order/${order._id}`)}
                >
                  <Typography variant="h6">{order._id}</Typography>
                  <Typography variant="body1">
                    {order.createdAt.slice(0, 10)}
                  </Typography>
                  <Typography variant="body1">{order.amount}</Typography>
                </Box>
              </Grid>
            ))
          ) : (
            <Box
              sx={{
                mt: 2,
                ml: 10,
              }}
            >
              <div>
                <Typography variant="h3">No orders</Typography>
              </div>
            </Box>
          )}
        </Grid>
      </Box>
      <Modal open={open} onClose={() => setOpen(false)}>
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
          <Typography variant="h6">Send Email to Seller</Typography>
          <Divider
            sx={{
              my: 2,
            }}
          />
          <TextField
            label="Subject"
            variant="outlined"
            sx={{
              mb: 2,
            }}
            multiline
            maxRows={4}
            onChange={(e) => setEmail({ ...email, subject: e.target.value })}
          />
          <TextField
            label="Message"
            variant="outlined"
            sx={{
              mb: 2,
            }}
            multiline
            rows={4}
            onChange={(e) => setEmail({ ...email, message: e.target.value })}
          />
          <Divider />
          <Button
            sx={{
              mt: 2,
            }}
            variant="contained"
          >
            Send
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default SellerDetails;
