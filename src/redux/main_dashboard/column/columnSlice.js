import { createSlice } from "@reduxjs/toolkit";
import { getColumn, addColumn, delateColumn, editColumn } from "../column/columnOperations";

const LOCAL_STORAGE_KEY = 'dashboard_columns';

const handlePending = (state) => {
    state.loading = true;
};

const handleRejected = (state, action) => {
    state.loading = false;
    state.error = action.payload;
};

const saveToStorage = (columns) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(columns));
};

const loadFromStorage = () => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
};

const initValues = {
    items: loadFromStorage(),
    loading: false,
    error: null,
};

const columnsSlice = createSlice({
    name: "columns",
    initialState: initValues,
    extraReducers: (builder) => {
        builder
            .addCase(getColumn.pending, handlePending)
            .addCase(getColumn.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.items = action.payload;
                saveToStorage(state.items);
            })
            .addCase(getColumn.rejected, handleRejected)

            .addCase(delateColumn.pending, handlePending)
            .addCase(delateColumn.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                const index = state.items.findIndex(
                    ({ id }) => id === action.payload.id
                );
                state.items.splice(index, 1);
                saveToStorage(state.items);
            })
            .addCase(delateColumn.rejected, handleRejected)

            .addCase(addColumn.pending, handlePending)
            .addCase(addColumn.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.items.push(action.payload);
                saveToStorage(state.items);
            })
            .addCase(addColumn.rejected, handleRejected)

            .addCase(editColumn.pending, handlePending)
            .addCase(editColumn.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                const index = state.items.findIndex(
                    (column) => column.id === action.payload.id
                );
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
                saveToStorage(state.items);
            })
            .addCase(editColumn.rejected, handleRejected);
    },
});

export const columnsReducer = columnsSlice.reducer;

