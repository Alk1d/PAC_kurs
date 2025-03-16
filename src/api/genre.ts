import { AccessTokenKey } from "../constants/commonConstants";
import { AxiosInstance } from "./axiosInstance";
import { AddGenreResponseDto, UpdateGenreResponseDto} from "../types/apiTypes";

export const GenresApi = () => {
const token = sessionStorage.getItem(AccessTokenKey) ?? '';
const { axiosDelete, axiosPost} = AxiosInstance(token);

const addGenre = async(addGenreData: AddGenreResponseDto) =>
    await axiosPost('/genres/genre', addGenreData) as number;

const editGenre = async(editGenreData: UpdateGenreResponseDto) =>
    await axiosPost('/genres/genre', editGenreData) as void;

const deleteGenre = async(id: string | number) =>
    await axiosDelete(`/genres/genre?id=${id}`) as void;

    return {
        addGenre,
        editGenre,
        deleteGenre
    }
}