import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import { insertUser } from "state/api";
import Header from "components/Header";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const AddUser = () => {
  const theme = useSelector((state) => state.global.mode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const state = null;
  const [country, setCountry] = useState("");
  const [occupation, setOccupation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const transactions = [];
  const [role, setRole] = useState("user");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    setName(data.get("name"));
    setEmail(data.get("email"));
    setPassword(data.get("password"));
    setCity(data.get("city"));
    setCountry(data.get("country"));
    setOccupation(data.get("occupation"));
    setPhoneNumber(data.get("phoneNumber"));
    setRole(data.get("role"));

    const user = await {
      name: name,
      email: email,
      password: password,
      city: city,
      state: state,
      country: country,
      occupation: occupation,
      phoneNumber: phoneNumber,
      transactions: transactions,
      role: role,
    };

    sendApi(user);
  };

  const token = useSelector((state) => state.global.userToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
    } else {
      navigate("/login");
    }
  }, [token]);

  const sendApi = async (user) => {
    insertUser(user)
      .then((res) => {
        sendToast("success");
        clearInputs();
      })
      .catch((err) => {
        sendToast("error");
      });
  };

  const clearInputs = () => {
    setName("");
    setEmail("");
    setPassword("");
    setCity("");
    setCountry("");
    setOccupation("");
    setPhoneNumber("");
    setRole("");
  };

  const sendToast = (mode) => {
    if (mode === "error") {
      toast.error("Add user failed!", {
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
      toast.success("Add user successful!", {
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
      <Header title="ADD USER" subtitle="You can add a new user from here." />
      <ThemeProvider theme={useTheme()}>
        <Container component="main" maxWidth="xs">
          <Box textAlign="center" mt="2rem">
            <Header
              title="User Form"
              subtitle="Fill this form and click add user."
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
                value={password}
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                value={email}
                name="email"
                label="Email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                value={country}
                name="country"
                label="Country"
                id="country"
                onChange={(e) => setCountry(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                value={city}
                name="city"
                label="City"
                id="city"
                onChange={(e) => setCity(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                value={occupation}
                name="occupation"
                label="Occupation"
                id="occupation"
                onChange={(e) => setOccupation(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                value={phoneNumber}
                name="phoneNumber"
                label="Phone Number"
                id="phoneNumber"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                value={role}
                name="role"
                label="Role"
                id="role"
                onChange={(e) => setRole(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Add User
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </Box>
  );
};

export default AddUser;
