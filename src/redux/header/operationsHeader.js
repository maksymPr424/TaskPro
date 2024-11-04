import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// In updateUserTheme action
const updateUserTheme = createAsyncThunk(
  "user/updateTheme",

  async (theme, { getState, rejectWithValue }) => {
    // console.log("Requested theme:", theme); // Debugging statement

    const { auth } = getState();

    try {
      const response = await axios.patch(
        "https://task-pro-back-kri0.onrender.com/user/",
        { theme },
        {
          headers: {
            // Authorization: `Bearer ${auth.accessToken}`,
            Authorization: `Bearer pLNesN1NxbxE5TkNLS20ISfePAm3TBVw5FdnALhT`,
            "Content-Type": "application/json",
          },
        }
      );

      // console.log("API response theme:", response.data); // Debugging statement
      return response.data;
    } catch (error) {
      console.error("Error updating theme:", error); // Debugging statement
      return rejectWithValue(error.response?.data || "Failed to update theme");
    }
  }
);

export default updateUserTheme;
