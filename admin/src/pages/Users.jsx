import { Typography, Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import React, { useState, useEffect, useCallback } from 'react';
import { useAuthContext } from '../context/AuthContext';
import axios from 'axios'

const Users = () => {
    const [users, setUsers] = useState([])
    const { token } = useAuthContext()

    const listUsers = useCallback(async () => {
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
    }, [token])

    useEffect(() => {
        listUsers()
    }, [listUsers])

    console.log(users)

    const columns = [
        { field: '_id', headerName: 'ID', width: 70 },
        {
            field: 'avatar',
            headerName: 'Avatar',
            width: 130,
        },
        {
            field: 'name',
            headerName: 'Name',
            width: 130,
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 130,
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
            field: 'updatedAt',
            headerName: 'Updated At',
            width: 130,
        },
    ];

    const rows = users.map(user => {
        return {
            _id: user._id,
            avatar: user?.avatar?.url,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }
    })


    return (
        <>
            <Typography>Users</Typography>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection
                    getRowId={(row) => row._id}
                />
            </div>
        </>

    )
}

export default Users