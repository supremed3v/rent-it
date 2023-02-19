import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

function getSellers(token) {
  return axios
    .get("http://localhost:5000/api/v1/sellers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data.sellers) // return the data
    .catch((err) => console.log(err));
}

const Sellers = () => {
  const navigate = useNavigate();
  const { token } = useAuthContext();
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    getSellers(token).then((data) => {
      setSellers(data);
    });
  }, [token]);
  console.log(sellers);

  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    {
      field: "name",
      headerName: "Name",
      width: 130,
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
    },
    {
      field: "rentedItems",
      headerName: "Products",
      width: 130,
    },
    {
      field: "approved",
      headerName: "Approved",
      width: 130,
    },
    {
      field: "action",
      headerName: "Action",
      width: 130,
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              navigate(`/seller/${params.row._id}`, {
                state: {
                  seller: params.row,
                },
              })
            }
          >
            View
          </Button>
        );
      },
    },
  ];

  const rows = sellers.map((seller) => {
    return {
      id: seller._id,
      _id: seller._id,
      name: seller.name,
      email: seller.email,
      rentedItems: seller.rentedItems.length,
      approved: seller.verifySellerIdCard ? "Yes" : "No",
      ...seller,
    };
  });

  return (
    <Box>
      <Typography variant="h4">Sellers</Typography>
      {sellers.length > 0 && (
        <Typography variant="h6">Total Sellers: {sellers.length}</Typography>
      )}
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </Box>
  );
};

export default Sellers;
