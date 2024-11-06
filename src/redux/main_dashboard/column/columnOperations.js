import { createAsyncThunk } from "@reduxjs/toolkit";
import { LOCAL_STORAGE_COLUMNS_KEY } from "./columnSlice";

const getStorageData = () => {
    const data = localStorage.getItem(LOCAL_STORAGE_COLUMNS_KEY);
    return data ? JSON.parse(data) : [];
};

const setStorageData = (data) => {
    localStorage.setItem(LOCAL_STORAGE_COLUMNS_KEY, JSON.stringify(data));
};

export const getColumn = createAsyncThunk(
    "columns/getColumn",
    async (_, thunkAPI) => {
        try {
            const data = getStorageData();
            return data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

export const addColumn = createAsyncThunk(
    "columns/addColumn",
    async ({ title }, thunkAPI) => {
        try {
            const columns = getStorageData();
            const newColumn = {
                id: Date.now(),
                title
            };
            const updatedColumns = [...columns, newColumn];
            setStorageData(updatedColumns);
            return newColumn;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

export const editColumn = createAsyncThunk(
    "columns/editColumn",
    async ({ id, title }, thunkAPI) => {
        try {
            const columns = getStorageData();
            const updatedColumns = columns.map(column =>
                column.id === id
                    ? { ...column, title }
                    : column
            );
            setStorageData(updatedColumns);
            return { id, title };
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

export const deleteColumn = createAsyncThunk(
    "columns/delateColumn",
    async (id, thunkAPI) => {
        try {
            const columns = getStorageData();
            const updatedColumns = columns.filter(column => column.id !== id);
            setStorageData(updatedColumns);
            return { id };
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);