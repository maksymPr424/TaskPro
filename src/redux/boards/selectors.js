export const selectBoards = (state) => state.boards.boards;
export const selectLastActiveBoard = (state) => state.boards.lastActiveBoard;
export const selectLoading = (state) => state.boards.loading;
export const selectError = (state) => state.boards.error;
export const selectActiveBoardId = (state) => state.boards.lastActiveBoard._id;
export const selectColumns = (state) => state.boards.lastActiveBoard.columns;
export const selectIsLoading = (state) => state.boards.loading;
export const selectBackgroundUrls = (state) =>
  state.boards.lastActiveBoard.backgroundUrls;
export const selectBackground = (state) =>
  state.boards.lastActiveBoard.background;
