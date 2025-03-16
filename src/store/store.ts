import { configureStore } from "@reduxjs/toolkit";
import { booksReducer, userReducer } from "./slices";

export const store = configureStore({
    reducer: {
        books: booksReducer,
        user: userReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;