import React from 'react'
import { useParams } from 'react-router-dom'
import { useProductsContext } from "../context/ProductsContext"
import { Box, Button, Grid, TextField, Typography, Switch, FormGroup, FormControlLabel } from "@mui/material"
import axios from 'axios'
import { useAuthContext } from '../context/AuthContext'
export default function EditProduct() {
    const { getProduct, product } = useProductsContext()
    const [sellerDetails, setSellerDetails] = React.useState([])
    const { token } = useAuthContext()

    const { id } = useParams()
    React.useEffect(() => {
        getProduct(id)
    }, [getProduct, id])

    const getSellerDetails = React.useCallback(async () => {
        try {
            const { data } = await axios.get(`http://localhost:5000/api/v1/seller-details/${product?.seller}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
            )
            setSellerDetails(data.seller)
        } catch (error) {

        }
    }, [product?.seller, token])

    React.useEffect(() => {
        getSellerDetails()
    }, [getSellerDetails])

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
                {sellerDetails && <Box>
                    <Typography variant='h6'>
                        Name: {sellerDetails?.name}
                    </Typography>
                    <Typography variant='h6'>
                        Email: {sellerDetails?.email}
                    </Typography>
                    <Typography variant='h6'>
                        Listed Products: {sellerDetails?.rentedItems?.length}
                    </Typography>
                </Box>}

            </Box>
        </Box>


    )
}