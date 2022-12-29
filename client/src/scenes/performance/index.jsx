import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/Header";
import { useGetUserPerformanceQuery } from "state/api";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const Performace = () => {
  const token = useSelector((state) => state.global.userToken);
  const userId = useSelector((state) => state.global.userId);
  const navigate = useNavigate();
  const theme = useTheme();
  const { data, isLoading } = useGetUserPerformanceQuery(userId);
  const [isDeleted, setIsDeleted] = useState(0);

  useEffect(() => {
    if (token) {
    } else {
      navigate("/login");
    }
  }, [token]);

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "userId",
      headerName: "User ID",
      flex: 0.5,
    },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      flex: 1,
    },
    {
      field: "products",
      headerName: "# of Products",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => {
        return params.value.length;
      },
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
  ];

  return (
    <Box m="1.5rem 2rem">
      <Header
        title={"PERFORMANCE"}
        subtitle={"Track your affiliate sales performance here."}
      />
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGird-cell": {
            borderBottom: "none",
          },
          "&. MuiDataGird-columnHeader": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.primary.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={!data}
          getRowId={(row) => row._id}
          rows={data || {}}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Performace;
