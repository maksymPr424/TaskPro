import { createSlice } from "@reduxjs/toolkit";
import {
  addCard,
  addColumn,
  deleteCard,
  deleteColumn,
  editCard,
  editCardColumn,
  editColumn,
  fetchBoards,
  removeBoard,
} from "./operations";
// import { LOCAL_STORAGE_COLUMNS_KEY } from "../main_dashboard/column/columnSlice";

const handlePending = (state) => {
  state.loading = true;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

// const saveToStorage = (columns) => {
//   localStorage.setItem(LOCAL_STORAGE_COLUMNS_KEY, JSON.stringify(columns));
// };

// const loadFromStorage = () => {
//   const saved = localStorage.getItem(LOCAL_STORAGE_COLUMNS_KEY);
//   return saved ? JSON.parse(saved) : [];
// };

const boardsSlice = createSlice({
  name: "boards",
  initialState: {
    lastActiveBoard: null,
    boards: [],
    loading: false,
    error: null,
  },
  reducers: {
    setBoards: (state, action) => {
      state.lastActiveBoard = action.payload.lastActiveBoard;
      state.boards = action.payload.boards;
    },
    addBoard: (state, action) => {
      state.boards.push(action.payload);
    },
    updateBoard: (state, action) => {
      const index = state.boards.findIndex(
        (board) => board._id === action.payload._id
      );
      if (index !== -1) {
        state.boards[index] = { ...state.boards[index], ...action.payload };
      }
    },
    deleteBoard: (state, action) => {
      state.boards = state.boards.filter(
        (board) => board._id !== action.payload
      );
    },
    clearBoards: (state) => {
      state.boards = [];
      state.lastActiveBoard = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchBoards.fulfilled, (state, action) => {
        state.lastActiveBoard = action.payload.lastActiveBoard;
        state.boards = action.payload.boards;
      })
      .addCase(removeBoard.fulfilled, (state, action) => {
        state.boards = state.boards.filter(
          (board) => board._id !== action.payload
        );
      })
      .addCase(removeBoard.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(addColumn.pending, handlePending)
      .addCase(addColumn.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.lastActiveBoard.columns.push(action.payload);
        // saveToStorage(state.items);
      })
      .addCase(addColumn.rejected, handleRejected)
      .addCase(editColumn.pending, handlePending)
      .addCase(editColumn.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.lastActiveBoard.columns = state.lastActiveBoard.columns.map(
          (column) => {
            if (column._id === action.payload._id) {
              column.title = action.payload.title;
            }
            return column;
          }
        );

        // saveToStorage(state.items);
      })
      .addCase(editColumn.rejected, handleRejected)
      .addCase(deleteColumn.pending, handlePending)
      .addCase(deleteColumn.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.lastActiveBoard.columns = state.lastActiveBoard.columns.filter(
          (column) => column._id !== action.payload
        );

        // saveToStorage(state.items);
      })
      .addCase(deleteColumn.rejected, handleRejected)
      .addCase(addCard.pending, handlePending)
      .addCase(addCard.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const columnIndex = state.lastActiveBoard.columns.findIndex(
          (column) => column._id === action.payload.columnId
        );

        state.lastActiveBoard.columns[columnIndex].tasks.push(action.payload);
        // saveToStorageCard(state.items);
      })
      .addCase(addCard.rejected, handleRejected)

      .addCase(editCard.pending, handlePending)
      .addCase(editCard.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const columnIndex = state.lastActiveBoard.columns.findIndex(
          (column) => column._id === action.payload.columnId
        );

        const taskIndex = state.lastActiveBoard.columns[
          columnIndex
        ].tasks.findIndex((task) => task._id === action.payload._id);

        state.lastActiveBoard.columns[columnIndex].tasks[taskIndex] =
          action.payload;
      })
      .addCase(editCard.rejected, handleRejected)
      .addCase(editCardColumn.pending, handlePending)
      .addCase(editCardColumn.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const columnIndex = state.lastActiveBoard.columns.findIndex(
          (column) => column._id === action.payload.taskData.columnId
        );
        const oldColumnIndex = state.lastActiveBoard.columns.findIndex(
          (column) => column._id === action.payload.oldColumnId
        );

        const taskIndex = state.lastActiveBoard.columns[
          oldColumnIndex
        ].tasks.findIndex((task) => task._id === action.payload.taskData._id);

        state.lastActiveBoard.columns[oldColumnIndex].tasks.splice(
          taskIndex,
          1
        );

        state.lastActiveBoard.columns[columnIndex].tasks.push(
          action.payload.taskData
        );
      })
      .addCase(editCardColumn.rejected, handleRejected)

      .addCase(deleteCard.pending, handlePending)
      .addCase(deleteCard.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const columnId = action.payload.columnId;
        const taskId = action.payload.taskId;
        const columnIndex = state.lastActiveBoard.columns.findIndex(
          (column) => column._id === columnId
        );

        const taskIndex = state.lastActiveBoard.columns[
          columnIndex
        ].tasks.findIndex((task) => task._id === taskId);

        state.lastActiveBoard.columns[columnIndex].tasks.splice(taskIndex, 1);

        // saveToStorageCard(state.items);
      })
      .addCase(deleteCard.rejected, handleRejected);
  },
});

export const { setBoards, addBoard, updateBoard, deleteBoard, clearBoards } =
  boardsSlice.actions;
export const boardsReducer = boardsSlice.reducer;
