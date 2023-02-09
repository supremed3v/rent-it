import { Typography, Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import React, { useState, useEffect, useCallback } from 'react';
import { useAuthContext } from '../context/AuthContext';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Users = () => {
    const navigate = useNavigate()
    const [users, setUsers] = useState([])
    const { token } = useAuthContext()

    const listUsers = async () => {
        try {
            const { data } = await axios.get("http://localhost:5000/api/v1/allUsers", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            setUsers(data.users)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        listUsers()
    }, [])

    console.log(users)

    const gridUserImage = (props) => {
        console.log(props, "props")
        return (
            <>
                <img src={props.avatar?.url} alt="user" width="50px" height="50px" />
                <Typography>{props.name}</Typography>
            </>
        )
    }

    const columns = [
        { field: '_id', headerName: 'ID', width: 250 },
        {
            field: 'name',
            headerName: 'Name',
            width: 130,
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 250,
        },
        {
            field: 'role',
            headerName: 'Role',
            width: 130,

        },
        {
            field: 'createdAt',
            headerName: 'Created At',
            width: 130,
        },
        {
            field: "rentedItems",
            headerName: "Rented Items",
            width: 130,
            textAlign: "center"
        },
        {
            field: "action",
            headerName: "Action",
            width: 130,
            renderCell: (params) => {
                const onClick = () => {
                    navigate(`/users/${params.row._id}`)
                }
                return (
                    <>
                        <Button onClick={onClick} size="small" variant="contained" style={{
                            backgroundColor: "#10B981",
                        }} >View</Button>
                    </>
                )
            }
        }

    ];

    const rows = users.map(user => {
        return {
            _id: user._id,
            avatar: user?.avatar?.url,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt.slice(0, 10).split("-").reverse().join("-"),
            rentedItems: user.rentedItems.length
        }
    })


    return (
        <>
            <Typography>Users</Typography>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid rows={rows} columns={columns} pageSize={5}
                    getRowId={(row) => row._id}
                />
            </div>
        </>

    )
}

export default Users