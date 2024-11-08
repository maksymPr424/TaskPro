
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setToken, taskpro_api } from "../../config/taskpro_api.js";

export const fetchBoards = createAsyncThunk('board/fetchBoards', async (_, { getState, rejectWithValue }) => {
  const state = getState();
  setToken(state.auth.token);
  try {
    const response = await taskpro_api.get('/board');
    return response.data;
  } catch (error) {
    console.error('Error fetching boards:', error);
    return rejectWithValue(error.response.data);
  }
});

export const createBoard = createAsyncThunk('board/createBoard', async (newBoard, { rejectWithValue }) => {
  try {
    const response = await taskpro_api.post('/board', newBoard);
    return response.data;
  } catch (error) {
    console.error('Error creating board:', error);
    return rejectWithValue(error.response.data);
  }
});

export const editBoard = createAsyncThunk('board/editBoard', async (updatedBoard, { rejectWithValue }) => {
  const { _id, ...restOfBoard } = updatedBoard;
  try {
    const response = await taskpro_api.patch(`/board/${_id}`, restOfBoard);
    return response.data;
  } catch (error) {
    console.error('Error editing board:', error);
    return rejectWithValue(error.response.data);
  }
});

export const removeBoard = createAsyncThunk('board/removeBoard', async (boardId, { rejectWithValue }) => {
  try {
    await taskpro_api.delete(`/board/${boardId}`);
    return boardId;
  } catch (error) {
    console.error('Error deleting board:', error);
    return rejectWithValue(error.response.data);
  }
});
