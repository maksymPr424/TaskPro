import { createAsyncThunk } from "@reduxjs/toolkit";
import { LOCAL_STORAGE_CARDS_KEY } from "./cardSlice";

const serializeCard = (card) => ({
    ...card,
    id: card.id || Date.now(),
    columnId: card.columnId,
    calendar: card.calendar instanceof Date ? card.calendar.toISOString() : card.calendar,
});

const deserializeCard = (card) => ({
    ...card,

    calendar: card.calendar ? new Date(card.calendar) : null,
});

const loadCardsFromStorage = () => {
    const saved = localStorage.getItem(LOCAL_STORAGE_CARDS_KEY);
    if (!saved) return [];

    const cards = JSON.parse(saved);
    return cards.map(deserializeCard);
};

const saveCardsToStorage = (cards) => {
    const serializedCards = cards.map(serializeCard);
    localStorage.setItem(LOCAL_STORAGE_CARDS_KEY, JSON.stringify(serializedCards));
};

export const getCard = createAsyncThunk("cards/getCard", async () => {
    const cards = loadCardsFromStorage();
    return cards.map(serializeCard);
});

export const addCard = createAsyncThunk("cards/addCard", async (card) => {
    const cards = loadCardsFromStorage();

    const newCard = serializeCard({
        ...card,
        id: Date.now(),
        columnId: card.columnId,
        createdAt: new Date()
    });

    cards.push(newCard);
    saveCardsToStorage(cards);

    return deserializeCard(newCard);
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

    return updatedCards;
});