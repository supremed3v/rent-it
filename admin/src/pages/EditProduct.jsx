import React from 'react'
import { useParams } from 'react-router-dom'
import { useProductsContext } from "../context/ProductsContext"
import { Box, Button, Grid, TextField, Typography, Switch, FormGroup, FormControlLabel, Modal } from "@mui/material"
import axios from 'axios'
import { useAuthContext } from '../context/AuthContext'
export default function EditProduct() {
    const { getProduct, product } = useProductsContext()
    const [sellerDetails, setSellerDetails] = React.useState([])
    const { token } = useAuthContext()

    const [openModal, setOpenModal] = React.useState(false)

    const { id } = useParams()
    React.useEffect(() => {
        getProduct(id)
    }, [getProduct, id])

    const getSellerDetails = React.useCallback(async () => {
        try {
            const { data } = await axios.get(`http://localhost:5000/api/v1/seller-details/${product.seller}`, {
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

    const handleModal = () => {
        setOpenModal(!openModal)
    }

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
                    {product?.isApproved ?
                        <Typography variant="h6">
                            Available</Typography>

                        :
                        <>
                            <Button variant="contained" sx={{
                                backgroundColor: "#f50057",
                                color: "#fff"

                            }}
                                onClick={handleModal}
                            >Approve Product</Button>
                            <Modal
                                open={openModal}
                                onClose={handleModal}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    width: 400,
                                    bgcolor: "background.paper",
                                    border: "2px solid #000",
                                    boxShadow: 24,
                                    p: 4,
                                }}>
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                        Approve Product
                                    </Typography>
                                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                        Are you sure you want to approve this product?
                                    </Typography>
                                    <Button variant="contained" sx={{
                                        backgroundColor: "#f50057",
                                        color: "#fff"

                                    }}>Approve</Button>
                                </Box>
                            </Modal>
                        </>
                    }

                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6">
                        {product?.isAvailable ? "Rented" : "Not out for rent"}
                    </Typography>
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