import { Box, Typography, Button, Modal } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { useNavigate } from "react-router-dom";
import CategoryModal from "../components/CategoryModal";
import { useCategoriesContext } from "../context/CategoriesContext";

const Categories = () => {
    const navigate = useNavigate();
    const { categories } = useCategoriesContext();
    const [openModal, setOpenModal] = React.useState(false);
    const [modalCategory, setModalCategory] = React.useState(null);
    const handleModal = (category) => {
        setOpenModal(!openModal);
        setModalCategory(category)
    };
    const columns = [
        { field: "_id", headerName: "ID", width: 150 },
        { field: "name", headerName: "Name", width: 130 },
        { field: "relatedProducts", headerName: "Products Count", width: 130 },
        {
            field: "action",
            headerName: "Action",
            width: 130,
            renderCell: (params) => (
                <strong>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        style={{ marginLeft: 16 }}
                        onClick={() => {
                            handleModal(params.row);
                        }}
                    >
                        Edit
                    </Button>
                </strong>
            ),
        },
    ];

    const rows = categories.map((category) => ({
        id: category._id,
        _id: category._id,
        name: category.name,
        relatedProducts: category.relatedProducts.length,
    }));

    return (
        <Box>
            <Typography variant="h4">Categories</Typography>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    marginTop: "20px",
                    ml: 2,
                }}
            >
                <div style={{ height: 400, width: 700 }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        checkboxSelection={false}
                    />
                </div>
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    style={{ marginLeft: 16, marginTop: 16, width: 150, height: 40 }}
                    onClick={() => navigate(`/categories/create`)}
                >
                    Create Category
                </Button>
            </Box>
            {openModal && (
                <CategoryModal
                openModal={openModal}
                setOpenModal={setOpenModal}
                category={modalCategory}
            />
            )}
        </Box>
    );
};

export default Categories;
