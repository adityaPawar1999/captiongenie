import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import themeReducer from "./themeSlice";
import authReducer from "./authSlice";
import postReducer from "./postSlice"
 

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["theme"],
};

// Combine all reducers
const rootReducer = combineReducers({
  auth: authReducer,
  theme: themeReducer,
  posts: postReducer, // ✅ Use the correct import
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);
