import React from 'react'
import { useParams } from 'react-router-dom'
import { useProductsContext } from "../context/ProductsContext"
import { Box, Button, Grid, TextField, Typography, Switch, FormGroup, FormControlLabel } from "@mui/material"

export default function EditProduct() {
    const { getProduct, product } = useProductsContext()
    const { id } = useParams()
    React.useEffect(() => {
        getProduct(id)
    }, [getProduct, id])

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "100vh"
        }}>
            <Typography variant="h4" sx={{
                marginBottom: "20px"
            }}>Edit Product</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Name"
                        variant="filled"
                        value={product?.name}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Price"
                        variant="filled"
                        value={product?.price}

                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Description"
                        variant="filled"
                        value={product?.description}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Category"
                        variant="filled"
                        value={product?.category}
                    />
                </Grid>
                {/* <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Images"
                        variant="outlined"
                        value={product.images}
                    />
                </Grid> */}
                <Grid item xs={12} md={6}>
                    <FormGroup>
                        <FormControlLabel control={
                            <Switch defaultChecked={product?.isApproved ? true : false}
                            />
                        }
                            label={product?.isApproved === "true" ? "Already Approved" : "Product not approved"} />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField

                        fullWidth
                        label="Available"
                        variant="filled"
                        value={product?.available}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Button variant="contained" sx={{
                        backgroundColor: "#f50057",
                        color: "#fff"

                    }}>Update</Button>
                </Grid>
            </Grid>
            <Box>
                <Typography variant='h4'>
                    Seller Details
                </Typography>
            </Box>
        </Box>


    )
}