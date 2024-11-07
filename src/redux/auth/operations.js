import { createAsyncThunk } from "@reduxjs/toolkit";
import { clearToken, setToken, taskpro_api } from "../../config/taskpro_api.js";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const { data: registerData } = await taskpro_api.post(
        "auth/register",
        credentials
      );
      const { email, password } = credentials;
      const loginData = await thunkAPI
        .dispatch(loginUser({ email, password }))
        .unwrap();
      setToken(loginData.accessToken);
      return { ...registerData, accessToken: loginData.accessToken };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await taskpro_api.post("auth/login", credentials);
      setToken(data.accessToken);
      return data;
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : "Something went wrong...";
      return thunkAPI.rejectWithValue({
        status: error.response?.status,
        message: errorMessage,
      });
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await taskpro_api.post("auth/logout");
      clearToken();
      return { message: "User has been logged out" };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to logout a user"
      );
    }
  }
);

export const refreshUser = createAsyncThunk(
  "auth/refreshUser",
  async (_, thunkAPI) => {
    const savedToken = thunkAPI.getState().auth.token;
    if (savedToken === null) {
      return thunkAPI.rejectWithValue("Access token not found");
    }
    try {
      setToken(savedToken);
      const { data } = await taskpro_api("auth/current");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        status: error.response?.status,
        message: error.response?.data?.message || "Something went wrong...",
      });
    }
  }
);
