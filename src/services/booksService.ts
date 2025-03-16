import { createAsyncThunk } from "@reduxjs/toolkit";
import { 
    AddBookResponseDto,
    UpdateBookResponseDto,
    AddGenreResponseDto,
    UpdateGenreResponseDto,
    AddAuthorResponseDto,
    UpdateAuthorResponseDto
} from "../types/apiTypes";
import { AsyncThunkOptions } from '../types/toolkitTypes';
import { BooksApi, GenresApi, AuthorsApi } from "../api";
import { Book } from "../types/models";

const NAMESPACE = 'books';

export const getBooks = createAsyncThunk<Array<Book>, undefined, AsyncThunkOptions>(
    `${NAMESPACE}/getBooks`,
    async(_, {rejectWithValue }) => {
        try {
            return await BooksApi().getBooks();
        } catch(error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const addBook = createAsyncThunk<Array<Book>, AddBookResponseDto, AsyncThunkOptions>(
    `${NAMESPACE}/addBook`,
    async(addBooksData, { rejectWithValue }) => {
        try {
            await BooksApi().addBook(addBooksData);
            return await BooksApi().getBooks();
        } catch(error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const editBook = createAsyncThunk<Array<Book>, UpdateBookResponseDto, AsyncThunkOptions>(
    `${NAMESPACE}/editBooks`,
    async(editBooksData, { rejectWithValue }) => {
        try {
            await BooksApi().editBook(editBooksData);
            return await BooksApi().getBooks();
        } catch(error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const deleteBook = createAsyncThunk<Array<Book>, string | number, AsyncThunkOptions>(
    `${NAMESPACE}/deleteBooks`,
    async(id, { rejectWithValue }) => {
        try {
            await BooksApi().deleteBook(id);
            return await BooksApi().getBooks();
        } catch(error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const addGenre = createAsyncThunk<Array<Book>, AddGenreResponseDto, AsyncThunkOptions>(
    `${NAMESPACE}/addGenre`,
    async(addGenreData, { rejectWithValue }) => {
        try {
            await GenresApi().addGenre(addGenreData);
            return await BooksApi().getBooks();
        } catch(error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const editGenre = createAsyncThunk<Array<Book>, UpdateGenreResponseDto, AsyncThunkOptions>(
    `${NAMESPACE}/editGenre`,
    async(editGenreData, { rejectWithValue }) => {
        try {
            await GenresApi().editGenre(editGenreData);
            return await BooksApi().getBooks();
        } catch(error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const deleteGenre = createAsyncThunk<Array<Book>, string | number, AsyncThunkOptions>(
    `${NAMESPACE}/deleteGenre`,
    async(id, { rejectWithValue }) => {
        try {
            await GenresApi().deleteGenre(id);
            return await BooksApi().getBooks();
        } catch(error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const addAuthor = createAsyncThunk<Array<Book>, AddAuthorResponseDto, AsyncThunkOptions>(
    `${NAMESPACE}/addAuthor`,
    async(addAuthorData, { rejectWithValue }) => {
        try {
            await AuthorsApi().addAuthor(addAuthorData);
            return await BooksApi().getBooks();
        } catch(error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const editAuthor = createAsyncThunk<Array<Book>, UpdateAuthorResponseDto, AsyncThunkOptions>(
    `${NAMESPACE}/editAuthor`,
    async(editAuthorData, { rejectWithValue }) => {
        try {
            await AuthorsApi().editAuthor(editAuthorData);
            return await BooksApi().getBooks();
        } catch(error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const deleteAuthor = createAsyncThunk<Array<Book>, string | number, AsyncThunkOptions>(
    `${NAMESPACE}/deleteAuthor`,
    async(id, { rejectWithValue }) => {
        try {
            await AuthorsApi().deleteAuthor(id);
            return await BooksApi().getBooks();
        } catch(error) {
            return rejectWithValue((error as Error).message);
        }
    }
);