import { FC, useEffect, useState } from 'react';
import { Layout } from "../../components/layouts"
import './booksPageStyles.scss'
import { Button, Dialog, DropDown, BooksList, GenresList, TextField } from '../../components';
import { Book } from '../../types/models';
import { PlusIcon} from '../../assets/icons';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxToolkitHooks';
import { useNavigate } from 'react-router-dom';
import { RoutesPaths } from '../../constants/commonConstants';
import { getBooks, addBook, editBook, deleteBook, addGenre, deleteGenre, addAuthor  }  from '../../services';

export const BooksPage: FC = () => {
    const { role, accessToken } = useAppSelector((state) => state.user);
    const { books } = useAppSelector((state) => state.books);
    const dispatch = useAppDispatch();

    const [selectedBookId, setSelectedBookId] = useState<number>();
    const [selectedBook, setSelectedBook] = useState<Book>();
    const [showBookDialog, setShowBookDialog] = useState(false);
    const [bookActionMode, setBookActionMode] = useState<'create' | 'edit'>('create');
    const [bookToEdit, setBookToEdit] = useState(0);
    const [bookStatus, setBookStatus] = useState<'прочитана' | 'не прочитана' | 'отдана'>('не прочитана');
    const statusOptions = [
        { text: 'не прочитана', value: 'не прочитана'},
        { text: 'прочитана', value: ' прочитана'},
        { text: 'отдана', value: 'отдана'},
    ]        

    const [bookName, setBookName] = useState('');
    const [genreName, setGenreName] = useState('');
    const [showGenreDialog, setShowGenreDialog] = useState(false);
    const [bookAuthor, setBookAuthor] = useState('');
    const [showAuthorDialog, setShowAuthorDialog] = useState(false);
    const [bookDescription, setBookDescription] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if(accessToken) {
            if(role === 'user' || role === 'guest') {
                dispatch(getBooks());
            } else {
                navigate(RoutesPaths.Login);
            }
        }
    }, [accessToken, role, navigate, dispatch]);

    useEffect(() => {
        const selectedBook = selectedBookId
            ? books.find(d => d.id === selectedBookId)
            : books[0];
        setSelectedBookId(selectedBook?.id);
    }, [books]);

    useEffect(() => {
        if (bookActionMode === 'edit') {
            const book = bookActionMode === 'edit'
                ? books.find(e => e.id === bookToEdit) : undefined;
            setBookName(book?.name ?? '');
            setBookAuthor(book?.author ?? '');
            setBookDescription(book?.description ?? '');
        }
    }, [books, bookActionMode, bookToEdit])

    const clearBookDialogFields = () => {
        setBookActionMode('create')
        setBookToEdit(0);
        setBookName('');
        setBookAuthor('');
        setBookDescription('');
        setBookStatus('не прочитана');
    }

    const createBookHandler = () => {
        setBookActionMode('create');
        setShowBookDialog(true);
    }

    const editBookHandler = (id: number) => {
        setBookActionMode('edit');
        setBookToEdit(id);
        setShowBookDialog(true);
    }

    const onBookSelectedHandler = (id: number) => {
        const book = books.find(e => e.id === id);
        setSelectedBook(book);
    }

    const deleteBookHandler = (id: number) => {
        setBookToEdit(id);
        if(window.confirm('Вы действительно хотите удалить данную книгу?')) {
            dispatch(deleteBook(id));
        }
    }

    const closeBookDialogHandler = () =>{
        setShowBookDialog(false);
        clearBookDialogFields();
    }

    const saveBookDialogHandler = () => {
        if(!selectedBookId) {
            return;
        }
        const savingBook = {
            id: selectedBookId,
            name: bookName,
            author: bookAuthor,
            status: bookStatus,
            description: bookDescription
        };
        if (bookActionMode === 'create') {
            dispatch(addBook(savingBook))
        }
        if (bookActionMode === 'edit' && selectedBook) {
            dispatch(editBook({
                ...savingBook,
                id: selectedBook.id,
                name: selectedBook.name,
                genre: selectedBook.genre,
                author: selectedBook.author,
                description: selectedBook.description
            }))
        }
        closeBookDialogHandler();
    }

    const getBookName = () => {
        if(!selectedBook) {
            return '';
        }
        return `${selectedBook.name}`.trim()
    }

    return (
        <Layout>
            {role === 'user' && (
                <Dialog title={bookActionMode !== 'edit' ? 'Добавить книгу' : 'Изменить книгу'}
                    open={showBookDialog}
                    onSave={saveBookDialogHandler}
                    onCancel={closeBookDialogHandler}
                >
                    <TextField labelText='Наименование' value={bookName} onChange={(val) => setBookName(val)} />
                    <TextField labelText='Автор' value={bookAuthor} onChange={(val) => setBookAuthor(val)}/>
                    <DropDown items={statusOptions} label="Статус книги:" 
                        selectedChanged={(val) => setBookStatus(val as typeof bookStatus)}
                        selectedValue={bookStatus}
                    />
                    <TextField labelText='Примечание' value={bookDescription} onChange={(val) => setBookDescription(val)}/>
                </Dialog>
            )}
            
            <Dialog title="Добавить жанр"
                open={showGenreDialog}
                onSave={() => {
                    dispatch(addGenre({
                        id: selectedBook!.id,
                        name: genreName
                    }));
                    setShowGenreDialog(false);
                    setGenreName('');
                }}
                onCancel={() => {
                    setShowGenreDialog(false);
                    setGenreName('');
                }}
            >
                <TextField labelText='Наименование' value={genreName} onChange={(val) => setGenreName(val)}/>
            </Dialog>
            <Dialog title="Автор"
                open={showAuthorDialog}
                onSave={() => {
                    dispatch(addAuthor({
                        id: selectedBook!.id,
                        FIO: bookAuthor
                    }));
                    setShowAuthorDialog(false);
                    setBookAuthor('');
                }}
                onCancel={() => {
                    setShowAuthorDialog(false);
                    setBookAuthor('');
                }}
            >
                <TextField labelText='Наименование' value={genreName} onChange={(val) => setGenreName(val)}/>
            </Dialog>
            <div className="book-page">
                <div className="book-page_list-container">
                    <BooksList booksList={books}
                    onItemClick={(id) => onBookSelectedHandler(id)}
                    onItemDelete={deleteBookHandler}
                    onItemEdit={editBookHandler}
                    />
                    {role ==='user' && (<Button text="Добавить книгу" className="book-page_add-book-btn" onClick={createBookHandler}/>)}
                </div>
                <div className='book-page_info-container'>
                    <div className='book-page_info-header'>
                        <div className='book-page_info-book'>
                            <div className='book-page_info-bookname'>
                                {getBookName()}
                            </div>
                            <div className='book-page_info-bookdata'>
                                <div>
                                    <strong>Автор: </strong>
                                    <span>{selectedBook?.author ?? '-'}</span>
                                </div>
                                <div>
                                    <strong>Примечание: </strong>
                                    <span>{selectedBook?.description ?? '-'}</span>
                                </div>
                                <div>
                                    <strong>Статус: </strong>
                                    <span>{selectedBook?.status ?? '-'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='book-page_add-info'>
                        <div className='book-page_add-info-data'>
                            <div className='book-page_add-info-data_cell'>
                                <div className='book-page_list-title'>
                                    <span className='book-page_label'> Жанры</span>
                                    {!!selectedBook && role === 'user' && (
                                        <PlusIcon onClick={() => setShowGenreDialog(true)}/>
                                    )}
                                </div>
                                <GenresList genresList={selectedBook?.genre ?? []} onDelete={(id) => {
                                    if(window.confirm('Вы действительно хотите удалить данную запись о жанре?')) {
                                        dispatch(deleteGenre(id));
                                    }
                                }}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}