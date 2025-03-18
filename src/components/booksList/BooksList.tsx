import { FC, useState } from 'react';
import { BooksListProps } from './BooksListProps'
import './booksListStyles.scss'
import clsx from 'classnames'
import { PencilIcon, TrashIcon } from '../../assets/icons';
import { useAppSelector } from '../../hooks/reduxToolkitHooks';

export const BooksList: FC<BooksListProps> = props => {
    const { booksList, onItemClick, onItemDelete, onItemEdit } = props;
    const { role } = useAppSelector((state) => state.user);
    const [selectedBook, setSelectedBook] = useState(0);

    const bookClickHandler = (id: number) => {
        setSelectedBook(id);
        onItemClick && onItemClick(id);
    }

    const bookEditHandler = (id: number) => {
        onItemEdit && onItemEdit(id)
    }

    const bookDeleteHandler = (id: number) => {
        onItemDelete && onItemDelete(id)
    }

    const isSelected = (id: number) => selectedBook ===id;

    return (
        <div className="books-list">
            {booksList.map(book => {
                return (
                <div key={book.id}
                className={clsx('books-list_item', {'books-list_item_selected':isSelected(book.id)})} 
                onClick={() => bookClickHandler(book.id)}
                >
                    <div>
                        {`${book.name}`.trim()}
                    </div>
                    <div className="books-list_item-actions">
                        {role === 'user' && (
                            <><PencilIcon width={18} height={18} onClick={() => { bookEditHandler(book.id); } } />
                            <TrashIcon width={18} height={18} onClick={() => { bookDeleteHandler(book.id); } } /></>
                        )}
                    </div>
                </div>
                );
            })}
        </div>
    );
}