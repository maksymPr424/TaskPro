import { createAsyncThunk } from "@reduxjs/toolkit";
import { setToken, taskpro_api } from "../../config/taskpro_api.js";

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
      return thunkAPI.rejectWithValue(error.message);
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
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      const response = await taskpro_api.post("auth/logout");
      if (response.status === 204 || response.status === 200) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        return { message: "User has been logged out" };
      } else {
        throw new Error(`Logout failed. Error ${response.status}`);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
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
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
