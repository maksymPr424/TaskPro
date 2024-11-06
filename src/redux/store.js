import { configureStore } from "@reduxjs/toolkit";
import { filtersReducer } from "./boards/sliceHeaderDashboard/filtersSlice.js";
import { boardReducer } from "./boards/sliceHeaderDashboard/boardSlice.js";

const store = configureStore({
  reducer: {
    board: boardReducer,
    filters: filtersReducer,
  },
});

export default store;
