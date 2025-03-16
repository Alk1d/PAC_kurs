import { AccessTokenKey } from "../constants/commonConstants";
import { 
    AddAuthorResponseDto,
    UpdateAuthorResponseDto
} from '../types/apiTypes';
import { AxiosInstance } from "./axiosInstance";

export const AuthorsApi = () => {
const token = sessionStorage.getItem(AccessTokenKey) ?? '';
const { axiosDelete, axiosPost} = AxiosInstance(token);

const addAuthor = async(addAuthorData: AddAuthorResponseDto) =>
    await axiosPost('/authors/author', addAuthorData) as number;

const editAuthor = async(editAuthorData: UpdateAuthorResponseDto) =>
    await axiosPost('/authors/author', editAuthorData) as void;

const deleteAuthor = async(id: string | number) =>
    await axiosDelete(`/authors/author?id=${id}`) as void;

    return {
        addAuthor,
        editAuthor,
        deleteAuthor
    }
}