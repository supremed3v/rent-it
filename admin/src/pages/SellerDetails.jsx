import React from "react";
import { useLocation } from "react-router-dom";
import { Typography, Box, Grid } from "@mui/material";

const SellerDetails = () => {
  const { state } = useLocation();
  const { seller } = state;
  console.log(seller);
  return (
    <div>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Seller Details
      </Typography>
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
      </Box>
    </div>
  );
};

export default SellerDetails;
