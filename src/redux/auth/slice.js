import { createSlice, isAnyOf } from "@reduxjs/toolkit";
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
  isRefreshing: false,
  error: null,
  refreshError: null,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.refreshError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.token = action.payload.accessToken;
      })
      .addCase(registerUser.rejected, (state, action) => {
        if (action.payload && action.payload.status === 409) {
          state.error = "This email is already in use. Please try another one.";
        } else if (action.payload && action.payload.status === 404) {
          state.error = "The requested resource was not found.";
        } else {
          state.error = "Something went wrong. Please try again.";
        }
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.token = action.payload.accessToken;
      })
      .addCase(loginUser.rejected, (state, action) => {
        if (action.payload && action.payload.status === 401) {
          state.error = "Wrong credentials. Please check and try again.";
        } else if (action.payload && action.payload.status === 404) {
          state.error = "The requested user or resource was not found.";
        } else {
          state.error = "Something went wrong. Please try again.";
        }
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        if (action.payload.status === 401) {
          state.refreshError =
            "Unable to refresh the user's session. Please log in again.";
        } else if (action.payload.status === 404) {
          state.refreshError =
            "User not found. Please check your credentials and log in again.";
        } else {
          state.refreshError = "Something went wrong. Please log in again.";
        }

        state.token = null;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.rejected, () => {
        return initialState;
      })
      .addCase(logoutUser.fulfilled, () => {
        return initialState;
      })
      .addMatcher(
        isAnyOf(registerUser.pending, loginUser.pending, refreshUser.pending),
        (state) => {
          state.error = null;
          state.refreshError = null;
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          registerUser.fulfilled,
          loginUser.fulfilled,
          refreshUser.fulfilled
        ),
        (state) => {
          state.isLoggedIn = true;
          state.error = null;
          state.refreshError = null;
          state.isLoading = false;
        }
      )
      .addMatcher(
        isAnyOf(
          registerUser.rejected,
          loginUser.rejected,
          refreshUser.rejected
        ),
        (state) => {
          state.isLoading = false;
          state.isLoggedIn = false;
          state.isRefreshing = false;
        }
      );
  },
});

export const authReducer = slice.reducer;
export const { clearError } = slice.actions;
