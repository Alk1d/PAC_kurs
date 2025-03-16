import { Book } from "../../types/models";

export interface BooksListProps {
    booksList: Array<Book>;
    onItemClick?: (id:number) => void;
    onItemEdit?: (id:number) => void;
    onItemDelete?: (id:number) => void;
} 