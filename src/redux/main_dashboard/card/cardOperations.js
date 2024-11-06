import { createAsyncThunk } from "@reduxjs/toolkit";
import { LOCAL_STORAGE_CARDS_KEY } from "./cardSlice";

const getStorageCardData = () => {
    const data = localStorage.getItem(LOCAL_STORAGE_CARDS_KEY);
    return data ? JSON.parse(data) : [];
};

const setStorageCardData = (data) => {
    localStorage.setItem(LOCAL_STORAGE_CARDS_KEY, JSON.stringify(data));
}

export const getCard = createAsyncThunk(
    "cards/getCard",
    async (_, thunkAPI) => {
        try {
            const data = getStorageCardData();
            return data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

export const addCard = createAsyncThunk(
    "cards/addCard",
    async ({ title, description, calendar, priority }, thunkAPI) => {
        try {
            const cards = getStorageCardData();
            const newCard = {
                id: Date.now(),
                title,
                description,
                calendar,
                priority
            };
            const updateCards = [...cards, newCard];
            setStorageCardData(updateCards);
            return newCard;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

export const editCard = createAsyncThunk(
    "cards/editCard",
    async ({ id, title, description, calendar, priority }, thunkAPI) => {
        try {
            const cards = getStorageCardData();
            const updateCards = cards.map(card => card.id === id ? { ...card, title, description, calendar, priority } : card);
            setStorageCardData(updateCards);
            return { id, title, description, calendar, priority };
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

export const deleteCard = createAsyncThunk(
    "cards/deleteCard",
    async (id, thunkAPI) => {
        try {
            const cards = getStorageCardData()
            const updateCards = cards.filter(card => card.id !== id);
            setStorageCardData(updateCards);
            return { id };
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);