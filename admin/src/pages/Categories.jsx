import { Typography } from '@mui/material'
import React from 'react'
import { useCategoriesContext } from '../context/CategoriesContext'

const Categories = () => {
    const { categories } = useCategoriesContext()
    console.log(categories)
    return (
        <Typography>Categories</Typography>
    )
}

export default Categories