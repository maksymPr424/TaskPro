import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  addCard,
  addColumn,
  createBoard,
  deleteCard,
  deleteColumn,
  editBoard,
  editCard,
  editCardColumn,
  editColumn,
  fetchBackground,
  fetchBoards,
  fetchLastActiveBoard,
  removeBoard,
} from './operations';

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const boardsSlice = createSlice({
  name: 'boards',
  initialState: {
    lastActiveBoard: {
      _id: null,
      title: null,
      background: 'no-background',
      backgroundUrls: [],
    },
    boards: [],
    loading: false,
    error: null,
  },
  reducers: {
    setBoards: (state, action) => {
      state.lastActiveBoard =
        action.payload.lastActiveBoard || action.payload.boards[0];
      state.boards = action.payload.boards;
    },
    setLastActiveBoard: (state, action) => {
      const { boardId, title } = action.payload;
      state.lastActiveBoard = { _id: boardId, title };
    },
    clearBackgroundUrls: (state) => {
      state.lastActiveBoard.backgroundUrls = [];
    },
    addBoard: (state, action) => {
      state.boards.push(action.payload);
    },
    // deleteBoard: (state, action) => {
    //   state.boards = state.boards.filter(
    //     (board) => board._id !== action.payload
    //   );
    // },
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
      .addCase(fetchBackground.fulfilled, (state, action) => {
        state.loading = false;
        const { mobile, tablet, desktop } = action.payload;
        state.lastActiveBoard.backgroundUrls = [mobile, tablet, desktop];
      })
      .addCase(fetchBackground.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createBoard.fulfilled, (state, action) => {
        state.lastActiveBoard = action.payload;
        state.boards.push(action.payload);
      })
      .addCase(editBoard.fulfilled, (state, action) => {
        const index = state.boards.findIndex(
          (board) => board._id === action.payload._id
        );
        if (index !== -1) {
          state.boards[index] = { ...state.boards[index], ...action.payload };
        }
        state.lastActiveBoard = action.payload;
      })
      .addCase(fetchLastActiveBoard.fulfilled, (state, action) => {
        state.lastActiveBoard = action.payload;
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
      .addCase(deleteCard.rejected)
      .addMatcher(
        isAnyOf(
          fetchBackground.pending,
          fetchBoards.pending,
          editBoard.pending,
          fetchLastActiveBoard.pending,
          removeBoard.pending
        ),
        (state) => {
          state.loading = true;
          state.loading = true;
          state.loading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchBackground.fulfilled,
          fetchBoards.fulfilled,
          editBoard.fulfilled,
          fetchLastActiveBoard.fulfilled,
          removeBoard.fulfilled
        ),
        (state) => {
          state.loading = false;
          state.loading = false;
          state.loading = false;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchBackground.rejected,
          fetchBoards.rejected,
          editBoard.rejected,
          fetchLastActiveBoard.rejected,
          removeBoard.rejected
        ),
        (state) => {
          state.loading = false;
          state.loading = false;
          state.loading = false;
        }
      );
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
  clearBackgroundUrls,
} = boardsSlice.actions;
export const boardsReducer = boardsSlice.reducer;
