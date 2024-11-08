import { createAsyncThunk } from "@reduxjs/toolkit";
import { LOCAL_STORAGE_CARDS_KEY } from "./cardSlice";

const serializeCard = (card) => ({
    ...card,
    calendar: card.calendar instanceof Date ? card.calendar.toISOString() : card.calendar,
});

const loadCardsFromStorage = () => {
    const saved = localStorage.getItem(LOCAL_STORAGE_CARDS_KEY);
    return saved ? JSON.parse(saved) : [];
};

const saveCardsToStorage = (cards) => {
    localStorage.setItem(LOCAL_STORAGE_CARDS_KEY, JSON.stringify(cards));
};

export const getCard = createAsyncThunk("cards/getCard", async () => {
    const cards = loadCardsFromStorage();
    return cards.map(serializeCard);
});

export const addCard = createAsyncThunk("cards/addCard", async (card) => {
    const cards = loadCardsFromStorage();
    const newCard = serializeCard({ ...card, id: Date.now() });
    cards.push(newCard);
    saveCardsToStorage(cards);
    return newCard;
});

export const editCard = createAsyncThunk("cards/editCard", async (updatedCard) => {
    const cards = loadCardsFromStorage();
    const index = cards.findIndex((card) => card.id === updatedCard.id);
    if (index !== -1) {
        cards[index] = serializeCard(updatedCard);
        saveCardsToStorage(cards);
        return cards[index];
    }
    throw new Error("Card not found");
});

export const deleteCard = createAsyncThunk("cards/deleteCard", async (cardId) => {
    const cards = loadCardsFromStorage();
    const updatedCards = cards.filter((card) => card.id !== cardId);
    saveCardsToStorage(updatedCards);
    return cardId;
});
