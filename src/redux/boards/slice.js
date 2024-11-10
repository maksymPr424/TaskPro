import { createSlice } from "@reduxjs/toolkit";
import { fetchBoards, removeBoard } from "./operations";

const boardsSlice = createSlice({
  name: "boards",
  initialState: {
    lastActiveBoard: {
      _id: null,
      title: null,
    },
    boards: [],
    loading: false,
    error: null,
  },
  reducers: {
    setBoards: (state, action) => {
      state.lastActiveBoard = action.payload.lastActiveBoard;
      state.boards = action.payload.boards;
    },
    setLastActiveBoard: (state, action) => {
      const { boardId, title } = action.payload;
      state.lastActiveBoard = { _id: boardId, title };
    },
    addBoard: (state, action) => {
      state.boards.push(action.payload);
    },
    updateBoard: (state, action) => {
      const index = state.boards.findIndex(
        board => board._id === action.payload._id
      );
      if (index !== -1) {
        state.boards[index] = { ...state.boards[index], ...action.payload };
      }
    },
    deleteBoard: (state, action) => {
      state.boards = state.boards.filter(board => board._id !== action.payload);
    },
    clearBoards: state => {
      state.boards = [];
      state.lastActiveBoard = null;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchBoards.fulfilled, (state, action) => {
        state.lastActiveBoard = action.payload.lastActiveBoard;
        state.boards = action.payload.boards;
      })
      .addCase(removeBoard.fulfilled, (state, action) => {
        state.boards = state.boards.filter(
          board => board._id !== action.payload
        );
      })
      .addCase(removeBoard.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const {
  setBoards,
  setLastActiveBoard,
  addBoard,
  updateBoard,
  deleteBoard,
  clearBoards,
} = boardsSlice.actions;
export const boardsReducer = boardsSlice.reducer;
