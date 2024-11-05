import axios from "axios";

export const taskpro_api = axios.create({
  // baseURL: "https://task-pro-back-kri0.onrender.com/",
  baseURL: "http://localhost:3000/",
});

export const setToken = token => {
  taskpro_api.defaults.headers.common.Authorization = `Bearer ${token}`;
};
export const clearToken = () => {
  taskpro_api.defaults.headers.common.Authorization = ``;
};
