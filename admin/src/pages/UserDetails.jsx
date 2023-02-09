import { useState, useEffect, useCallback } from 'react';
import { useAuthContext } from '../context/AuthContext';
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Box, Button, Grid, TextField, Typography, Switch, FormGroup, FormControlLabel } from "@mui/material"


export default function UserDetails() {
    const { id } = useParams()
    const [userDetails, setUserDetails] = useState([])
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

    console.log(userDetails)

    return (
        <Box>
            <Typography variant="h4" sx={{
                marginBottom: "20px"
            }}>User Details</Typography>
        </Box>
    )
}