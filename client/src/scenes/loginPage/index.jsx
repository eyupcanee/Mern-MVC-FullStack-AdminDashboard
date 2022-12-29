import React, { useState } from "react";
import { setUser, setToken } from "state";
import { loginUser } from "state/api";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";

import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import Header from "components/Header";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = {
      email,
      password,
    };

    loginUser(user)
      .then((res) => {
        if (res.data.status === "no") {
          sendToast("error");
          clearInputs();
        } else {
          sendToast("success");

          dispatch(setToken(res.data.token));
          dispatch(setUser(jwt_decode(res.data.token).id));
          navigate("/");
        }
      })
      .catch((err) => {
        sendToast("error");
        clearInputs();
      });
  };

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  const sendToast = (mode) => {
    if (mode === "error") {
      toast.error("Login failed! Please check your email and password.", {
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
      toast.success("Login Succeed!", {
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
    <Box
      m="1.5rem 2rem"
      height="100%"
      display="grid"
      justifyContent="center"
      alignItems="center"
    >
      <ThemeProvider theme={useTheme()}>
        <Container component="main" maxWidth="xs">
          <Box textAlign="center" mt="2rem" justifyContent="center">
            <Header title="Login" subtitle="Enter your email and password" />
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
                value={email}
                id="email"
                label="Email"
                name="email"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </Box>
  );
};

export default LoginPage;
