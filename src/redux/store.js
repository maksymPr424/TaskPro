import { configureStore } from "@reduxjs/toolkit";
import {
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import { columnsReducer } from "./main_dashboard/column/columnSlice";
import { cardsReducer } from "./main_dashboard/card/cardSlice";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";


const persistConfigColumn = {
    key: "columns",
    storage,
    whitelist: ["token"],
};

const persistConfigCard = {
    key: "cards",
    storage,
    whitelist: ["token"],
};



export const store = configureStore({
    reducer: {
        columns: persistReducer(persistConfigColumn, columnsReducer),
        cards: persistReducer(persistConfigCard, cardsReducer),

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});
export const persistor = persistStore(store);





