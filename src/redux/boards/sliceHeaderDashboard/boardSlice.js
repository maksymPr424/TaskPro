import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  boards: [],
  boardName: "",
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setBoardName: (state, action) => {
      state.boardName = action.payload;
    },
  },
});

export const boardReducer = boardSlice.reducer;
export const { setBoardName } = boardSlice.actions;
