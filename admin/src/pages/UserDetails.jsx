import { useState, useEffect, useCallback } from 'react';
import { useAuthContext } from '../context/AuthContext';
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Box, Button, Grid, TextField, Typography, Switch, FormGroup, FormControlLabel } from "@mui/material"


export default function UserDetails() {
    const { id } = useParams()
    const [userDetails, setUserDetails] = useState([])
    const [sellerProducts, setSellerProducts] = useState([])
    const { token } = useAuthContext()

    const getUserDetails = useCallback(async () => {
        try {
            const { data } = await axios.get(`http://localhost:5000/api/v1/user-details/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            setUserDetails(data.user)
        } catch (error) {
            console.log(error)
        }
    }, [token, id])

    useEffect(() => {
        getUserDetails()
    }, [getUserDetails])


    const getRentedItems = useCallback(async () => {
        try {
            const { data } = await axios.get(`http://localhost:5000/api/v1/get-rented-products/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            setSellerProducts(data.products)
        } catch (error) {
            console.log(error.response.data.message)
        }
    }, [token, id])

    useEffect(() => {
        getRentedItems()
    }, [getRentedItems])

    console.log(sellerProducts)

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "100vh"

        }} >
            <Typography variant="h4" sx={{
                marginBottom: "20px"
            }}>User Details</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Name"
                        variant="filled"
                        value={userDetails?.name}
                        contentEditable={false}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Email"
                        variant="filled"
                        value={userDetails?.email}

                        contentEditable={false}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6" textAlign={"center"}>
                        Role: {" "}
                        {userDetails?.role?.charAt(0).toUpperCase() + userDetails?.role?.slice(1)}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"

                    }}>

                        <img
                            src={userDetails?.avatar?.url === "url" && "https://picsum.photos/200/300"}
                            alt={userDetails?.name}
                            style={{
                                width: "100px",
                                height: "100px",
                                borderRadius: "50%",
                                objectFit: "cover"
                            }}

                        />
                    </Box>
                </Grid>
            </Grid>
            {sellerProducts?.length > 0 && <Typography variant="h4" sx={{
                marginTop: "20px"
            }}>Rented Items</Typography>}
            {sellerProducts?.map((product) => (
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginTop: "20px"
                }}>
                    <Typography variant="h6" sx={{
                        marginBottom: "20px"
                    }}>Product Name: {product?.name}</Typography>
                    <img
                        src={product?.images[0]?.url !== "url" ? product?.images[0]?.url : "https://picsum.photos/200/300"}
                        alt={product?.name}
                        style={{
                            width: "100px",
                            height: "100px",
                            borderRadius: "50%",
                            objectFit: "cover"
                        }}
                    />
                </Box>
            ))

            }
        </Box>
    )
}