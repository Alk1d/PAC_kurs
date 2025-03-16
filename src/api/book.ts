import { AccessTokenKey } from "../constants/commonConstants";
import { AxiosInstance } from "./axiosInstance";
import { AddBookResponseDto, UpdateBookResponseDto } from "../types/apiTypes";

export const BooksApi = () => {
    const token = sessionStorage.getItem(AccessTokenKey) ?? '';
    const { axiosDelete, axiosGet, axiosPost} = AxiosInstance(token);
    
    const getBooks = async() =>
        await axiosGet('/books');

    const addBook = async(addBookData: AddBookResponseDto) =>
        await axiosPost('/books/book', addBookData) as number;

    const editBook = async(editBookData: UpdateBookResponseDto) =>
        await axiosPost('/book/book', editBookData) as void;

    const deleteBook = async(id: string | number) =>
        await axiosDelete(`/book/book?id=${id}`) as void;

    return {
        getBooks,
        addBook,
        editBook,
        deleteBook
    }
}