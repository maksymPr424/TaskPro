import { createSlice } from "@reduxjs/toolkit";
import {
  loginUser,
  logoutUser,
  refreshUser,
  registerUser,
} from "./operations.js";

const initialState = {
  user: {
    name: "",
    email: "",
  },
  token: null,
  isLoggedIn: false,
  isLoading: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  extraReducers: builder => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.token = action.payload.accessToken;
        state.isLoggedIn = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.token = action.payload.accessToken;
        state.isLoggedIn = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
      })
      .addCase(logoutUser.pending, state => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, () => {
        return initialState;
      });
  },
});

export const authReducer = slice.reducer;
