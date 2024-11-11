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

// const handlePending = (state) => {
//   state.loading = true;
// };

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
    lastActiveBoard: {
      _id: null,
      title: null,
      columns: [],
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
    updateColumn: (state, action) => {
      const index = state.lastActiveBoard.columns.findIndex(
        (column) => column._id === action.payload.id
      );
      state.lastActiveBoard.columns[index].title = action.payload.title;
    },
    deleteColumnSpeed: (state, action) => {
      state.lastActiveBoard.columns = state.lastActiveBoard.columns.filter(
        (column) => column._id !== action.payload
      );
    },
    updateTask: (state, action) => {
      const indexColumn = state.lastActiveBoard.columns.findIndex(
        (column) => column._id === action.payload.columnId
      );
      const index = state.lastActiveBoard.columns[indexColumn].tasks.findIndex(
        (task) => task._id === action.payload.taskId
      );
      state.lastActiveBoard.columns[indexColumn].tasks[index] = {
        ...state.lastActiveBoard.columns[indexColumn].tasks[index],
        ...action.payload.updateData,
      };
    },
    updateTaskColumn: (state, action) => {
      const { columnId, oldColumnId, taskId } = action.payload;

      const columnIndex = state.lastActiveBoard.columns.findIndex(
        (column) => column._id === columnId
      );
      const oldColumnIndex = state.lastActiveBoard.columns.findIndex(
        (column) => column._id === oldColumnId
      );

      const taskIndex = state.lastActiveBoard.columns[
        oldColumnIndex
      ].tasks.findIndex((task) => task._id === taskId);

      state.lastActiveBoard.columns[columnIndex].tasks.push({
        ...state.lastActiveBoard.columns[oldColumnIndex].tasks[taskIndex],
        columnId,
      });
      console.log(123);

      state.lastActiveBoard.columns[oldColumnIndex].tasks.splice(taskIndex, 1);
    },
    deleteTask: (state, action) => {
      const indexColumn = state.lastActiveBoard.columns.findIndex(
        (column) => column._id === action.payload.columnId
      );
      const index = state.lastActiveBoard.columns[indexColumn].tasks.findIndex(
        (task) => task._id === action.payload.taskId
      );
      state.lastActiveBoard.columns[indexColumn].tasks.splice(index, 1);
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
      .addCase(addColumn.fulfilled, (state, action) => {
        state.lastActiveBoard.columns.push({ ...action.payload, tasks: [] });
      })
      .addCase(addColumn.rejected, handleRejected)
      .addCase(editColumn.rejected, (state, action) => {
        const columnId = state.lastActiveBoard.columns.findIndex(
          (column) => column._id === action.payload._id
        );
        state.lastActiveBoard.columns[columnId] = action.payload;
      })
      .addCase(deleteColumn.rejected, (state, action) => {
        const index = state.lastActiveBoard.columns.findIndex(
          (column) => column._id === action.payload.id
        );
        state.lastActiveBoard.columns.splice(index, 1);
      })
      .addCase(addCard.pending)
      .addCase(addCard.fulfilled, (state, action) => {
        const columnIndex = state.lastActiveBoard.columns.findIndex(
          (column) => column._id === action.payload.columnId
        );

        state.lastActiveBoard.columns[columnIndex].tasks.push(action.payload);
      })
      .addCase(addCard.rejected, handleRejected)

      .addCase(editCard.rejected, (state, action) => {
        const columnIndex = state.lastActiveBoard.columns.findIndex(
          (column) => column._id === action.payload.columnId
        );

        const taskIndex = state.lastActiveBoard.columns[
          columnIndex
        ].tasks.findIndex((task) => task._id === action.payload._id);

        state.lastActiveBoard.columns[columnIndex].tasks[taskIndex] =
          action.payload;
      })
      .addCase(editCardColumn.rejected)
      .addCase(deleteCard.rejected);
  },
});

export const {
  setBoards,
  addBoard,
  updateBoard,
  deleteBoard,
  updateColumn,
  deleteColumnSpeed,
  updateTask,
  updateTaskColumn,
  deleteTask,
  setLastActiveBoard,
  clearBoards,
} = boardsSlice.actions;
export const boardsReducer = boardsSlice.reducer;
