import { useState, useEffect, useCallback } from 'react';
import { useAuthContext } from '../context/AuthContext';
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Button, Grid, TextField, Typography, Switch, FormGroup, FormControlLabel } from "@mui/material"
import { DataGrid } from '@mui/x-data-grid';


export default function UserDetails() {
    const navigate = useNavigate()
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

    const columns = [
        { field: '_id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'price', headerName: 'Price', width: 130 },
        { field: 'description', headerName: 'Description', width: 130 },
        { field: 'category', headerName: 'Category', width: 130 },
        { field: 'images', headerName: 'Image', width: 130 },
        { field: "approved", headerName: "Approved", width: 130 },
        { field: "available", headerName: "Availibility", width: 130 },
        {
            field: "action", headerName: "Action", width: 170, renderCell: (params) => {
                const onEdit = () => {
                    console.log(params.row._id)
                    navigate(`/product/${params.row._id}`)
                }

                return (
                    <>
                        <Button onClick={onEdit} variant="outlined" size='small' sx={{
                            backgroundColor: "#f50057",
                            marginRight: "10px"
                        }} >View</Button>
                    </>
                )
            }
        }
    ]
    const rows = sellerProducts?.map((product) => {
        return {
            id: product._id,
            _id: product._id,
            name: product.name,
            price: product.price,
            description: product.description,
            category: product.category,
            images: product.images && product.images.map((image) =>
                image[0]?.url
            ),
            approved: product.approved,
            seller: product.seller,
            available: product.available
        }
    })

    return (
        <>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",

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
                            value={userDetails?.name || "Name"}
                            contentEditable={false}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Email"
                            variant="filled"
                            value={userDetails?.email || "Email"}

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
                                src={userDetails?.avatar?.url === "url" ? "https://picsum.photos/200/300" : userDetails?.avatar?.url}
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
                    <Grid item xs={12} md={6}>
                        {userDetails?.role === "seller" && (
                            <img 
                            src={userDetails?.verifySellerIdCard?.url === "url" ? "https://picsum.photos/200/300" : userDetails?.verifySellerIdCard?.url} alt={userDetails?.name} style={{
                                width: "300px",
                                height: "300px",
                                borderRadius: "10px",
                                objectFit: "cover"
                            }}
                            />
                        )}
                    </Grid>
                    <Grid item xs={12} md={6}>
                        {userDetails?.role === "seller" && (
                            <img
                                src={userDetails?.verifySellerImage?.url === "url" ? "https://picsum.photos/200/300" : userDetails?.verifySellerImage?.url}
                                alt={userDetails?.name}
                                style={{
                                    width: "300px",
                                    height: "300px",
                                    borderRadius: "10px",
                                    objectFit: "cover"
                                }}
                                />
                        )}
                    </Grid>
                </Grid>
            </Box>
            {sellerProducts?.length > 0 && (
                <div style={{
                    height: 400,
                    width: '100%',
                    marginTop: "20px"
                }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                    />
                </div>
            )}
        </>
    )
}