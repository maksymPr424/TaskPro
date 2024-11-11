import { createSlice } from "@reduxjs/toolkit";
// import updateUserTheme from "./operationsHeader.js";
// import updateUserProfile from "./operationsHeader.js";
import {
  updateUserTheme,
  updateUserProfile,
  updateUserPhoto,
} from "./operationsHeader.js";

const userSlice = createSlice({
  name: "user",
  initialState: {
    theme: "dark", // Начальная тема
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserTheme.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateUserTheme.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.theme = action.payload.theme;
      })
      .addCase(updateUserTheme.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState: {
    data: {
      name: "",
      email: "",
      password: "",
      photoUrl: "",
    },
    status: "idle",
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(updateUserProfile.pending, (state) => {
        console.log("updateUserProfile.pending");
        state.status = "loading";
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        console.log("updateUserProfile.fulfilled");
        console.log("action.payload: ", action.payload);
        state.status = "succeeded";
        state.data = action.payload;
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        console.log("updateUserProfile.rejected");
        console.log("action.payload: ", action.payload);
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(updateUserPhoto.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserPhoto.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data.photoUrl = action.payload.photoUrl;
        state.error = null;
      })
      .addCase(updateUserPhoto.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const userThemeReducer = userSlice.reducer;
export const userProfileReducer = userProfileSlice.reducer;
