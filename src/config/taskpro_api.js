import axios from "axios";

const isProduction = import.meta.env.VITE_IS_PRODUCTION === "true";
const API_URL = import.meta.env.VITE_API_URL;
const LOCALHOST = import.meta.env.VITE_LOCALHOST_URL;

const baseURL = isProduction ? API_URL : LOCALHOST;

export const taskpro_api = axios.create({
  baseURL,
  withCredentials: true,
});

export const setToken = token => {
  taskpro_api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearToken = () => {
  taskpro_api.defaults.headers.common.Authorization = ``;
};
