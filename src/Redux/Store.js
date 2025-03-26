import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import themeReducer from "./themeSlice.js";
import authReducer from "./authSlice.js";
import postReducer from "./postSlice.js";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "theme", "posts"], // ✅ Persist auth and posts to maintain state
};

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  theme: themeReducer,
  posts: postReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
