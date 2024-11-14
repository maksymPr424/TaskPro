import { createAsyncThunk } from '@reduxjs/toolkit';
import { taskpro_api } from '../../config/taskpro_api.js';

export const fetchBoards = createAsyncThunk(
  'board/fetchBoards',
  async (_, { rejectWithValue }) => {
    try {
      const response = await taskpro_api.get('/board');
      return response.data;
    } catch (error) {
      console.error('Error fetching boards:', error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchLastActiveBoard = createAsyncThunk(
  'board/fetchLastActiveBoard',
  async (id, { rejectWithValue }) => {
    try {
      const response = await taskpro_api.get(`/board/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching boards:', error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchBackground = createAsyncThunk(
  'background/fetchBackground',
  async (name, { rejectWithValue }) => {
    try {
      const response = await taskpro_api.get(`/background/${name}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching background:', error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const createBoard = createAsyncThunk(
  'board/createBoard',
  async (newBoard, { rejectWithValue }) => {
    try {
      const response = await taskpro_api.post('/board', newBoard);
      return response.data;
    } catch (error) {
      console.error('Error creating board:', error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const editBoard = createAsyncThunk(
  'board/editBoard',
  async (updatedBoard, { rejectWithValue }) => {
    const { _id, ...restOfBoard } = updatedBoard;
    try {
      const response = await taskpro_api.patch(`/board/${_id}`, restOfBoard);
      return response.data;
    } catch (error) {
      console.error('Error editing board:', error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeBoard = createAsyncThunk(
  'board/removeBoard',
  async (boardId, { rejectWithValue }) => {
    try {
      const { data } = await taskpro_api.delete(`/board/${boardId}`);
      return { ...data, boardId };
    } catch (error) {
      console.error('Error deleting board:', error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const addColumn = createAsyncThunk(
  'board/addColumn',
  async (newColumn, { rejectWithValue }) => {
    try {
      const res = await taskpro_api.post('/columns', { ...newColumn });

      return res.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const editColumn = createAsyncThunk(
  'board/editColumn',
  async ({ id, title, boardId }, { rejectWithValue }) => {
    try {
      const res = await taskpro_api.patch(`/columns/${id}`, { title, boardId });

      return res.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const deleteColumn = createAsyncThunk(
  'board/deleteColumn',
  async (id, { rejectWithValue }) => {
    try {
      await taskpro_api.delete(`/columns/${id}`);

      return id;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const addCard = createAsyncThunk(
  'board/addCard',
  async ({ boardId, columnId, taskData }, { rejectWithValue }) => {
    try {
      const res = await taskpro_api.post('/tasks', {
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
  'board/editCard',
  async ({ taskId, updateData }, { rejectWithValue }) => {
    try {
      const res = await taskpro_api.patch(`/tasks/${taskId}`, {
        ...updateData,
      });

      return res.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);
export const editCardColumn = createAsyncThunk(
  'board/editCardColumn',
  async ({ taskId, updateData }, { rejectWithValue }) => {
    const { oldColumnId, ...restUpdateData } = updateData;

    try {
      const res = await taskpro_api.patch(`/tasks/${taskId}`, {
        ...restUpdateData,
      });

      return { taskData: res.data, oldColumnId };
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const deleteCard = createAsyncThunk(
  'board/deleteCard',
  async ({ columnId, taskId }, { rejectWithValue }) => {
    try {
      await taskpro_api.delete(`/tasks/${taskId}`);
      return { columnId, taskId };
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);
