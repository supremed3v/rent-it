import { Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductsContext } from "../context/ProductsContext"

const Products = () => {
    const { products } = useProductsContext()
    const navigate = useNavigate()
    const columns = [
        { field: '_id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'price', headerName: 'Price', width: 130 },
        { field: 'description', headerName: 'Description', width: 130 },
        { field: 'category', headerName: 'Category', width: 130 },
        { field: 'images', headerName: 'Image', width: 130 },
        { field: "approved", headerName: "Approved", width: 130 },
        { field: "seller", headerName: "Seller", width: 130 },
        { field: "available", headerName: "Availibility", width: 130 },
        {
            field: "action", headerName: "Action", width: 130, renderCell: (params) => {
                const onEdit = () => {
                    console.log(params.row._id)
                    navigate(`/product/${params.row._id}`)
                }
                const onDelete = () => {
                    console.log(params.row)
                }
                return (
                    <>
                        <button onClick={onEdit}>Edit</button>
                        <button>Delete</button>
                    </>
                )
            }
        }
    ]
    const rows = products.map((product) => {
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
            <Typography>Products</Typography>
            <br />
            <div style={{ height: 400, width: "100%" }}>

                <DataGrid

                    rows={rows}
                    columns={columns} pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
            </div>
        </>
    )
}

export default Products