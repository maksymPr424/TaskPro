import { createAsyncThunk } from "@reduxjs/toolkit";
import { setToken, taskpro_api } from "../../config/taskpro_api";

const updateUserTheme = createAsyncThunk(
  "user/updateTheme",

  async (theme, { getState, rejectWithValue }) => {
    const { auth } = getState();
    setToken(auth.token);

    try {
      const response = await taskpro_api.patch(
        "https://task-pro-back-kri0.onrender.com/user/",
        { theme }
      );

      return response.data;
    } catch (error) {
      console.error("Error updating theme:", error);
      return rejectWithValue(error.response?.data || "Failed to update theme");
    }
  }
);

const updateUserProfile = createAsyncThunk(
  "user/updateProfile",
  async (userProfile, { getState, rejectWithValue }) => {
    const { auth } = getState();
    setToken(auth.token);
    try {
      const response = await taskpro_api.patch(
        "https://task-pro-back-kri0.onrender.com/user",
        userProfile,
        {
          headers: {
            Authorization: `Bearer /QYy5Z19KZDuJlhEeGj0JbQ4mjaDoEcwRqRGBGSy`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const updateUserPhoto = createAsyncThunk(
  "user/updatePhoto",
  async (formData, { getState, rejectWithValue }) => {
    const { auth } = getState();
    setToken(auth.token);
    try {
      const response = await taskpro_api.patch(
        "https://task-pro-back-kri0.onrender.com/user",
        formData,
        {
          headers: {
            Authorization: `Bearer /QYy5Z19KZDuJlhEeGj0JbQ4mjaDoEcwRqRGBGSy`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export { updateUserTheme, updateUserProfile, updateUserPhoto };
