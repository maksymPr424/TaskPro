import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedColor: null,
  columns: [],
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    resetFilter: (state) => {
      state.selectedColor = null;
    },
    setColorFilter: (state, action) => {
      state.selectedColor = action.payload;
    },
    setColumns: (state, action) => {
      const selectColumns = action.payload.columns;

      if (!action.payload.priority) {
        state.columns = selectColumns;
      } else {
        const filteredColumn = selectColumns.map((column) => ({
          ...column,
          tasks: column.tasks.filter(
            (task) => task.priority === action.payload.priority
          ),
        }));
        state.columns = filteredColumn;
      }
    },
  },
});

export const selectColumnsForRender = (state) => state.filters.columns;
export const selectedColor = (state) => state.filters.selectedColor;

export const filtersReducer = filtersSlice.reducer;
export const { resetFilter, setColorFilter, setColumns } = filtersSlice.actions;
