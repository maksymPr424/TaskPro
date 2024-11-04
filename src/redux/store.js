import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./header/slice.js";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
