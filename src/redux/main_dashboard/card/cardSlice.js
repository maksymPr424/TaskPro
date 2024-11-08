// cardSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { addCard, deleteCard, editCard, getCard } from "./cardOperations";

export const LOCAL_STORAGE_CARDS_KEY = 'dashboard_card';

const handlePendingCard = (state) => {
    state.loading = true;
};

const handleRejectedCard = (state, action) => {
    state.loading = false;
    state.error = action.payload;
};

const saveToStorageCard = (cards) => {
    localStorage.setItem(LOCAL_STORAGE_CARDS_KEY, JSON.stringify(cards));
};

const loadFromStorageCard = () => {
    const saved = localStorage.getItem(LOCAL_STORAGE_CARDS_KEY);
    return saved ? JSON.parse(saved) : [];
};

const initValuesCard = {
    items: loadFromStorageCard(),
    loading: false,
    error: null
};

const cardSlice = createSlice({
    name: "cards",
    initialState: initValuesCard,
    extraReducers: (builder) => {
        builder
            .addCase(getCard.pending, handlePendingCard)
            .addCase(getCard.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.items = action.payload;
                saveToStorageCard(state.items);
            })
            .addCase(getCard.rejected, handleRejectedCard)

            .addCase(addCard.pending, handlePendingCard)
            .addCase(addCard.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.items.push(action.payload);
                saveToStorageCard(state.items);
            })
            .addCase(addCard.rejected, handleRejectedCard)

            .addCase(editCard.pending, handlePendingCard)
            .addCase(editCard.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                const index = state.items.findIndex(
                    (card) => card.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
                saveToStorageCard(state.items);
            })
            .addCase(editCard.rejected, handleRejectedCard)

            .addCase(deleteCard.pending, handlePendingCard)
            .addCase(deleteCard.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                const index = state.items.findIndex(
                    ({ id }) => id === action.payload.id
                );
                state.items.splice(index, 1);
                saveToStorageCard(state.items);
            })
            .addCase(deleteCard.rejected, handleRejectedCard)
    }
});

export const cardsReducer = cardSlice.reducer;