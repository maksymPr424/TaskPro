import { configureStore } from "@reduxjs/toolkit";
import { boardsReducer } from "./boards/slice.js";

export const store = configureStore({
  reducer: {
    boards: boardsReducer,
  },
});
