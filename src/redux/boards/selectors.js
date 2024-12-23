// export const selectLoading = state => state.boards.loading;
import { createSelector } from 'reselect';
export const selectBoards = state => state.boards.boards;
export const selectLastActiveBoard = state => state.boards.lastActiveBoard;
export const selectError = state => state.boards.error;
export const selectIsLoading = state => state.boards.loading;

export const selectActiveBoardId = state =>
  state.boards.lastActiveBoard?._id || null;

export const selectBackgroundUrls = state =>
  state.boards.lastActiveBoard?.backgroundUrls || [];

export const selectBackground = state =>
  state.boards.lastActiveBoard?.background || 'no-background';

export const selectColumns = createSelector(
  [state => state.boards.lastActiveBoard?.columns],
  columns => {
    return columns && columns.length > 0 ? columns : [];
  }
);

// export const selectColumns = state =>
//   state.boards.lastActiveBoard?.columns || [];

// export const selectColumns = createSelector(
//   state => state.boards.lastActiveBoard?.columns,
//   columns => columns || []
// );

// export const selectBackgroundUrls = createSelector(
//   [state => state.boards.lastActiveBoard.backgroundUrls],
//   backgroundUrls => {
//     if (!backgroundUrls || backgroundUrls.length === 0) {
//       return [];
//     }
//     return backgroundUrls;
//   }
// );

// export const selectColumns = createSelector(
//   [state => state.boards.lastActiveBoard.columns],
//   columns => {
//     if (!columns || columns.length === 0) {
//       return [];
//     }
//     return columns;
//   }
// );
