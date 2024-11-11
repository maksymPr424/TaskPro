import { createAsyncThunk } from "@reduxjs/toolkit";
import { setToken, taskpro_api } from "../../config/taskpro_api";

const updateUserTheme = createAsyncThunk(
  "user/updateUserTheme",

  async (theme, { getState, rejectWithValue }) => {
    const { auth } = getState();
    setToken(auth.token);

    try {
      const response = await taskpro_api.patch("/user", { theme });

      return response.data;
    } catch (error) {
      console.error("Error updating theme:", error);
      return rejectWithValue(error.response?.data || "Failed to update theme");
    }
  }
);

const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async (userProfile, { getState, rejectWithValue }) => {
    const { auth } = getState();
    setToken(auth.token);
    try {
      const response = await taskpro_api.patch("/user", userProfile);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const updateUserPhoto = createAsyncThunk(
  "user/updateUserPhoto",
  async (formData, { getState, rejectWithValue }) => {
    const { auth } = getState();
    setToken(auth.token);
    try {
      const response = await taskpro_api.patch("/user", formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export { updateUserTheme, updateUserProfile, updateUserPhoto };
