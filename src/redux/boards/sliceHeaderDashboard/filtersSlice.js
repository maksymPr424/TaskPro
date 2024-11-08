import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  selectedColor: null,
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
      state.selectedColor = null;
    },
    setColorFilter: (state, action) => {
      state.selectedColor = action.payload;
    },
  },
});

export const filtersReducer = filtersSlice.reducer;
export const { changeFilter, resetFilter, setColorFilter } =
  filtersSlice.actions;
