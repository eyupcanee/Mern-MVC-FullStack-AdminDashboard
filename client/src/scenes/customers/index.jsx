import React, { useState, useEffect } from "react";
import { Box, Button, useTheme } from "@mui/material";
import { deleteUser, getCustomers } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const Customers = () => {
  const theme = useTheme();
  const [data, setData] = useState({});
  const [isDeleted, setIsDeleted] = useState(0);
  const token = useSelector((state) => state.global.userToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      setData(
        getCustomers().then((res) => {
          setData(res.data);
        })
      );
    } else {
      navigate("/login");
    }
  }, [isDeleted]);

  //console.log(data);
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 0.5,
      renderCell: (params) => {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
      },
    },
    {
      field: "country",
      headerName: "Country",
      flex: 0.4,
    },
    {
      field: "occupation",
      headerName: "Occupation",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.5,
    },
    {
      field: "delete",
      headerName: "Delete User",
      flex: 0.5,
      renderCell: (params) => {
        return (
          <Button
            sx={{
              color: `${theme.palette.secondary[100]}`,
              backgroundColor: `${theme.palette.secondary[600]}`,
            }}
            onClick={(e) => deleteHandler(e, params.row)}
          >
            Delete
          </Button>
        );
      },
    },
  ];

  const deleteHandler = (e, row) => {
    deleteUser(row._id, token)
      .then((res) => {
        sendToast("success");
        setIsDeleted(isDeleted + 1);
      })
      .catch((err) => sendToast("error"));
  };

  const sendToast = (mode) => {
    if (mode === "error") {
      toast.error("Delete user failed!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme,
      });
    } else {
      toast.success("Delete user successful!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme,
      });
    }
  };

  return (
    <Box m="1.5rem 2rem">
      <Header title={"CUSTOMERS"} subtitle={"List of all customers."} />
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

export default Customers;
