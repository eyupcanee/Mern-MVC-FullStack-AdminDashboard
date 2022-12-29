import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import { insertProduct } from "state/api";
import Header from "components/Header";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);
  const [supply, setSupply] = useState(0);
  const theme = useTheme();

  const token = useSelector((state) => state.global.userToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
    } else {
      navigate("/login");
    }
  }, [token]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    setName(data.get("name"));
    setPrice(data.get("price"));
    setDescription(data.get("description"));
    setCategory(data.get("category"));
    setRating(data.get("rating"));
    setSupply(data.get("supply"));

    const product = {
      name: name,
      price: price,
      description: description,
      category: category,
      rating: rating,
      supply: supply,
    };

    if (name === "") sendToast("error");
    else if (category === "") sendToast("error");
    else if (price === 0) sendToast("error");
    else if (description === "") sendToast("error");
    else {
      sendApi(product);
      sendToast("success");
      clearInputs();
    }
  };

  const sendApi = async (product) => {
    insertProduct(product);
  };

  const clearInputs = () => {
    setName("");
    setPrice(0);
    setDescription("");
    setCategory("");
    setRating(0);
    setSupply(0);
  };

  const sendToast = (mode) => {
    if (mode === "error") {
      toast.error("Add product failed!", {
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
      toast.success("Add product successful!", {
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
      <Header
        title="ADD PRODUCT"
        subtitle="You can add a new product from here."
      />
      <ThemeProvider theme={useTheme()}>
        <Container component="main" maxWidth="xs">
          <Box textAlign="center" mt="2rem">
            <Header
              title="Product Form"
              subtitle="Fill this form and click add product."
              sx={{ alignItems: "center" }}
            />
          </Box>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                value={name}
                id="name"
                label="Name"
                name="name"
                autoFocus
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                value={price}
                name="price"
                label="Price"
                type="number"
                id="price"
                onChange={(e) => setPrice(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                value={description}
                name="description"
                label="Description"
                id="description"
                onChange={(e) => setDescription(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                value={category}
                name="category"
                label="Category"
                id="category"
                onChange={(e) => setCategory(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                value={rating}
                name="rating"
                label="Rating"
                id="rating"
                type="number"
                onChange={(e) => setRating(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                value={supply}
                name="supply"
                label="Supply"
                id="supply"
                type="number"
                onChange={(e) => setSupply(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Add Product
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </Box>
  );
};

export default AddProduct;
