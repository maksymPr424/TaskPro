import { createAsyncThunk } from "@reduxjs/toolkit";
import { setToken, taskpro_api } from "../../config/taskpro_api.js";

export const fetchBoards = createAsyncThunk(
  "board/fetchBoards",
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    setToken(state.auth.token);
    try {
      const response = await taskpro_api.get("/board");
      return response.data;
    } catch (error) {
      console.error("Error fetching boards:", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const createBoard = createAsyncThunk(
  "board/createBoard",
  async (newBoard, { rejectWithValue }) => {
    try {
      const response = await taskpro_api.post("/board", newBoard);
      return response.data;
    } catch (error) {
      console.error("Error creating board:", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const editBoard = createAsyncThunk(
  "board/editBoard",
  async (updatedBoard, { rejectWithValue }) => {
    const { _id, ...restOfBoard } = updatedBoard;
    try {
      const response = await taskpro_api.patch(`/board/${_id}`, restOfBoard);

      return response.data;
    } catch (error) {
      console.error("Error editing board:", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeBoard = createAsyncThunk(
  "board/removeBoard",
  async (boardId, { rejectWithValue }) => {
    try {
      await taskpro_api.delete(`/board/${boardId}`);
      return boardId;
    } catch (error) {
      console.error("Error deleting board:", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const addColumn = createAsyncThunk(
  "board/addColumn",
  async (newColumn, { getState, rejectWithValue }) => {
    const state = getState();
    setToken(state.auth.token);
    try {
      const res = await taskpro_api.post("/columns", { ...newColumn });

      return res.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const editColumn = createAsyncThunk(
  "board/editColumn",
  async ({ id, title, boardId }, { getState, rejectWithValue }) => {
    const state = getState();
    setToken(state.auth.token);
    try {
      const res = await taskpro_api.patch(`/columns/${id}`, { title, boardId });

      return res.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const deleteColumn = createAsyncThunk(
  "board/deleteColumn",
  async (id, { getState, rejectWithValue }) => {
    const state = getState();
    setToken(state.auth.token);
    try {
      await taskpro_api.delete(`/columns/${id}`);

      return id;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const addCard = createAsyncThunk(
  "board/addCard",
  async ({ boardId, columnId, taskData }, { getState, rejectWithValue }) => {
    const state = getState();
    setToken(state.auth.token);

    try {
      const res = await taskpro_api.post("/tasks", {
        ...taskData,
        boardId,
        columnId,
      });
      return res.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const editCard = createAsyncThunk(
  "board/editCard",
  async ({ taskId, updateData }, { getState, rejectWithValue }) => {
    const state = getState();
    setToken(state.auth.token);
    try {
      const res = await taskpro_api.patch(`/tasks/${taskId}`, {
        ...updateData,
      });

      return res.data;
    } catch (e) {
      rejectWithValue(e.message);
    }
  }
);
export const editCardColumn = createAsyncThunk(
  "board/editCardColumn",
  async ({ taskId, updateData }, { getState, rejectWithValue }) => {
    const state = getState();
    setToken(state.auth.token);

    const oldColumnId = updateData.oldColumnId;

    if (updateData.oldColumnId) delete updateData.oldColumnId;

    try {
      const res = await taskpro_api.patch(`/tasks/${taskId}`, {
        ...updateData,
      });

      return { taskData: res.data, oldColumnId };
    } catch (e) {
      rejectWithValue(e.message);
    }
  }
);

export const deleteCard = createAsyncThunk(
  "board/deleteCard",
  async ({ columnId, taskId }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      setToken(state.auth.token);
      await taskpro_api.delete(`/tasks/${taskId}`);
      return { columnId, taskId };
    } catch (e) {
      rejectWithValue(e.message);
    }
  }
);
