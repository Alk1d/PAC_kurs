import { Genre } from "../../types/models";

export interface GenresListProps {
    genresList: Array<Genre>;
    onDelete?: (id: number) => void;
}