import { UnknownAction, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Book } from "../../types/models";
import { getBooks, addBook, editBook, deleteBook, addGenre, editGenre, deleteGenre, addAuthor, editAuthor, deleteAuthor } from "../../services";

const NAME = 'books';

interface BooksState {
    books: Array<Book>;
    loading: boolean;
    booksError?: string | null;
}

const initialState: BooksState = {
    books: [],
    loading: false,
    booksError: undefined
}

const isLoading = (action: UnknownAction) => action.type.endsWith('pending');
const isError = (action: UnknownAction) => action.type.endsWith('rejected');

const setState = (state: any, action: any) => {
    state.books = action.payload;
    state.booksError = undefined;
    state.loading  = false;
}

const booksSlice = createSlice({
    name: NAME,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBooks.fulfilled, (state, action) => {
                setState(state, action);
            })
            .addCase(addBook.fulfilled, (state, action) => {
                setState(state, action);
            })
            .addCase(editBook.fulfilled, (state, action) => {
                setState(state, action);
            })
            .addCase(deleteBook.fulfilled, (state, action) => {
                setState(state, action);
            })
            .addCase(addGenre.fulfilled, (state, action) => {
                setState(state, action);
            })
            .addCase(editGenre.fulfilled, (state, action) => {
                setState(state, action);
            })
            .addCase(deleteGenre.fulfilled, (state, action) => {
                setState(state, action);
            })
            .addCase(addAuthor.fulfilled, (state, action) => {
                setState(state, action);
            })
            .addCase(editAuthor.fulfilled, (state, action) => {
                setState(state, action);
            })
            .addCase(deleteAuthor.fulfilled, (state, action) => {
                setState(state, action);
            })
            .addMatcher(isLoading, (state) => {
                state.loading = true;
                state.booksError = undefined;
            })
            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.booksError = action.payload;
            })
    }
});

export const booksReducer = booksSlice.reducer;