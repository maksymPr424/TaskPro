import { createSlice } from "@reduxjs/toolkit";
import { fetchBoards, removeBoard } from './operations';

const boardsSlice = createSlice({
  name: 'boards',
  initialState: {
    boards: [],
    loading: false,
    error: null,
  },
  reducers: {
    setBoards: (state, action) => {
      state.boards = action.payload;
    },
    addBoard: (state, action) => {
      state.boards.push(action.payload);
    },
    updateBoard: (state, action) => {
      const index = state.boards.findIndex(board => board._id === action.payload._id);
      if (index !== -1) {
        state.boards[index] = { ...state.boards[index], ...action.payload };
      }
    },
    deleteBoard: (state, action) => {
      state.boards = state.boards.filter(board => board._id !== action.payload);
    },
    clearBoards: (state) => {
      state.boards = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchBoards.fulfilled, (state, action) => {
        state.boards = action.payload;
      })
      .addCase(removeBoard.fulfilled, (state, action) => {
        state.boards = state.boards.filter(board => board._id !== action.payload);
      })
      .addCase(removeBoard.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setBoards, addBoard, updateBoard, deleteBoard, clearBoards } = boardsSlice.actions;
export const boardsReducer = boardsSlice.reducer;
