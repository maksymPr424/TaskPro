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

import { userThemeReducer } from "./header/slice.js";
import { userProfileReducer } from "./header/slice.js";
import { boardReducer } from "./boards/sliceHeaderDashboard/boardSlice.js";
import { filtersReducer } from "./boards/sliceHeaderDashboard/filtersSlice.js";

const persistConfig = {
  key: "auth_token",
  version: 1,
  storage,
  whitelist: ["token"],
};

const isSerializable = (value) => {
  return isPlain(value) || value instanceof Date;
};

const persistConfigUser = {
  key: "user",
  version: 1,
  storage,
  whitelist: ["theme"],
};

const persistConfigUserProfile = {
  key: "userProfile",
  version: 1,
  storage,
  whitelist: ["user"],
};

const persistConfigBoard = {
  key: "board",
  version: 1,
  storage,
};

const persistConfigFilters = {
  key: "filters",
  version: 1,
  storage,
  whitelist: ["selectedColor"],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(persistConfig, authReducer),
    user: persistReducer(persistConfigUser, userThemeReducer),
    userProfile: persistReducer(persistConfigUserProfile, userProfileReducer),
    boards: persistReducer(persistConfig, boardsReducer),
    board: persistReducer(persistConfigBoard, boardReducer),
    filters: persistReducer(persistConfigFilters, filtersReducer),
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
