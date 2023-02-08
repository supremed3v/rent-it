import React from 'react'
import { useParams } from 'react-router-dom'
import { useProductsContext } from "../context/ProductsContext"

export default function EditProduct() {
    const { getProduct, product } = useProductsContext()
    const { id } = useParams()
    React.useEffect(() => {
        getProduct(id)
    }, [getProduct, id])

    return (
        <div>
            Edit Product
        </div>
    )
}