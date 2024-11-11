import { configureStore, isPlain } from "@reduxjs/toolkit";
import { authReducer } from "./auth/slice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { boardsReducer } from "./boards/slice";
const persistConfig = {
  key: "auth_token",
  version: 1,
  storage,
  whitelist: ["token"],
};

const isSerializable = (value) => {
  return isPlain(value) || value instanceof Date;
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(persistConfig, authReducer),
    boards: persistReducer(persistConfig, boardsReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        isSerializable,
      },
    }),
});

export const persistor = persistStore(store);
