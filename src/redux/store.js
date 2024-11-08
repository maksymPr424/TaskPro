import { configureStore } from "@reduxjs/toolkit";
import { userThemeReducer } from "./header/slice.js";
import { userProfileReducer } from "./header/slice.js";

const store = configureStore({
  reducer: {
    user: userThemeReducer,
    userProfile: userProfileReducer,
  },
});

export default store;
