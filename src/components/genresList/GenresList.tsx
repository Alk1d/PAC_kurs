import { FC } from "react";
import { GenresListProps } from './GenresListProps'
import './genresListStyles.scss';
import { DownloadIcon, TrashIcon } from "../../assets/icons";
import { useAppSelector } from "../../hooks/reduxToolkitHooks";

export const GenresList: FC<GenresListProps> = props => {
    const { genresList, onDelete } = props;
    const { role } = useAppSelector((state) => state.user);

    const deleteHandler = (id: number) => {
        onDelete && onDelete(id);
    }

    return(
        <div className="genres-list">
            {genresList.map(genres => {
                return (
                    <div key={genres.id} className="genres-list_item">
                        <div className="genres-list_item-desc">
                            <span className="genres-list_item-desc-description">{genres.name}</span>
                        </div>
                        <div className="genres-list_item-actions">
                            {role === 'user' && (<><TrashIcon width={20} height={20} onClick={() => deleteHandler(genres.id)}></TrashIcon></>)}
                        </div>
                    </div>
                )
            })}
        </div>
    );
}