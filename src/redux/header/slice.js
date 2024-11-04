import { createSlice } from "@reduxjs/toolkit";
import updateUserTheme from "./operationsHeader.js";

const userSlice = createSlice({
  name: "user",
  initialState: {
    theme: "light", // Начальная тема
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUserTheme.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateUserTheme.fulfilled, (state, action) => {
        // console.log("action.payload: ", action.payload);
        state.status = "succeeded";
        state.theme = action.payload.theme;
      })
      .addCase(updateUserTheme.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
