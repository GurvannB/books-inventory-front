import {CircularProgress, TextField} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import './books-list.style.css';
import {useApp} from "../../contexts/app.context.tsx";

export default function BooksListPage() {
    const {books, booksLoading} = useApp();

    const bookList = books.map(book => (
        <tr key={book.id}>
            <td>{book.number}</td>
            <td>{book.bookCondition}</td>
            <td>{book.type.isbn}</td>
            <td>
                <button><EditIcon className='cursor-pointer text-primary'/></button>
                <button><DeleteIcon className='cursor-pointer text-primary'/></button>
            </td>
        </tr>
    ));

    return (
        <div className='relative rounded overflow-hidden'>
            <div className='absolute bg-black/65 w-full h-full flex justify-center items-center' style={{visibility: booksLoading ? 'visible' : 'hidden'}}>
                <CircularProgress />
            </div>
            <div className='flex flex-col gap-4 p-2'>
                <div className='flex gap-2'>
                    <TextField placeholder='Filtrer par numéro de livre...' size='small' className='w-full max-w-[300px]' type='number' />
                    <button><SearchIcon className='cursor-pointer text-primary'/></button>
                </div>
                <table className='w-full text-left'>
                    <thead>
                        <tr>
                            <th>Numéro de livre</th>
                            <th>État</th>
                            <th>ISBN</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {bookList}
                    </tbody>
                </table>
            </div>
        </div>
    );
}