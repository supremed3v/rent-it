import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useProductsContext } from "../context/ProductsContext"
import { Box, Button, Grid, TextField, Typography, Switch, FormGroup, FormControlLabel, Modal } from "@mui/material"
import axios from 'axios'
import { useAuthContext } from '../context/AuthContext'
export default function EditProduct() {
    const { getProduct, product } = useProductsContext()
    const [sellerDetails, setSellerDetails] = React.useState([])
    const { token } = useAuthContext()
    const navigate = useNavigate()

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

    const handleSellerDetails = () => {
        navigate(`/users/${sellerDetails._id}`)
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
                        variant="outlined"
                        value={product?.name || "No name"}
                        contentEditable={false}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Price"
                        variant="filled"
                        value={product?.price || 0}

                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Description"
                        variant="filled"
                        value={product?.description || "No description"}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Category"
                        variant="filled"
                        value={product?.category || "No category"}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: "20px",
                        overflowX: "scroll",
                        scrollBehavior: "smooth",
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                        '&::-webkit-scrollbar': {
                            display: "none"
                        }

                    }}>

                        {product?.images?.length > 0 && (
                            product?.images.map((image, index) => (
                                <img src={image.url === "url" ? "https://picsum.photos/200/300" : image.url} key={index} alt={image.url}
                                    style={{
                                        width: "100px",
                                        height: "100px",
                                        objectFit: "cover",
                                        margin: "0 10px"
                                    }}
                                />
                            ))
                        )}
                    </Box>
                    <Typography variant="caption">
                        Drag left to see more images...
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    {product?.isApproved ?
                        <Typography variant="h6">
                            Available</Typography>

                        :
                        <>
                            <Button variant="contained"
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
                        backgroundColor: "red",
                        color: "#fff",
                        '&:hover': {
                            backgroundColor: "white",
                            color: "red",
                        }


                    }}>Delete</Button>
                </Grid>
            </Grid>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginTop: "20px",
                    borderColor: "#fff",
                    padding: "20px",
                    borderRadius: "10px",
                    borderWidth: "2px",
                    borderStyle: "solid",
                    backgroundColor: "#041014",
                    cursor: "pointer",
                    '&:hover': {
                        transform: "scale(1.05)",
                        transition: "all 0.3s ease-in-out"
                    }
                }}
                onClick={handleSellerDetails}
            >
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