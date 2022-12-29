import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  userId: localStorage.getItem("user"),
  userToken: localStorage.getItem("token"),
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setUser: (state, userId) => {
      state.userId = userId.payload;
      localStorage.setItem("user", userId.payload);
    },
    setToken: (state, token) => {
      state.userToken = token.payload;
      localStorage.setItem("token", token.payload);
    },
  },
});

export const { setMode, setUser, setToken } = globalSlice.actions;

export default globalSlice.reducer;
