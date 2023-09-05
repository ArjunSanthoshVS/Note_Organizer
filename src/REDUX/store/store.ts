import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import notesReducer from "../Slices/noteSlice";
import { Note } from "../Slices/noteSlice";

export type RootState = {
  notes: {
    notes: Note[];
  };
};

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, notesReducer);

const store = configureStore({
  reducer: {
    notes: persistedReducer,
  },
});

export const persistor = persistStore(store);

export default store;
