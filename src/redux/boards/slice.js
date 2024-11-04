import { createSlice } from "@reduxjs/toolkit";

const boardsSlice = createSlice({
  name: 'boards',
  initialState: [],
  reducers: {
    setBoards: (state, action) => {
      return action.payload;
    },
    addBoard: (state, action) => {
      state.push(action.payload);
    },
    updateBoard: (state, action) => {
      const index = state.findIndex(board => board.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteBoard: (state, action) => {
      return state.filter(board => board.id !== action.payload);
    },
    clearBoards: () => {
      return [];
    },
  },
});

export const { setBoards, addBoard, updateBoard, deleteBoard, clearBoards } = boardsSlice.actions;

export const boardsReducer = boardsSlice.reducer;
