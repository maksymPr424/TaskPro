import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    changeFilter: (state, action) => {
      state.name = action.payload;
    },
    resetFilter: (state) => {
      state.name = "";
    },
  },
});

export const filtersReducer = filtersSlice.reducer;
export const { changeFilter, resetFilter } = filtersSlice.actions;
