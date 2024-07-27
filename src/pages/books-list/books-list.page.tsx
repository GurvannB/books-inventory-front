import {Button, Divider, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {useApp} from "../../contexts/app.context.tsx";
import LoadingWrapper from "../../components/loading-wrapper.component.tsx";
import {bookConditions} from "../../core/constants.tsx";
import {useEffect, useState} from "react";
import {useFormik} from "formik";
import {deleteBook, saveBook, updateBook} from "../../services/books.service.ts";
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import ConfirmModal from "../../components/confirm-modal.component.tsx";
import {BookDto} from "../../models/book.model.ts";

type FormBookDto = {
    bookNumber: string,
    bookTypeId: string,
    bookCondition: string,
    comment: string
}

export default function BooksListPage() {
    const [loading, setLoading] = useState(false);
    const [selectedBookId, setSelectedBookId] = useState<number | undefined>();
    const [deletionConfirmModalOpen, setDeletionConfirmModalOpen] = useState<boolean>(false);
    const {books, reloadBooks, booksLoading, bookTypes, bookTypesLoading} = useApp();

    useEffect(() => {
        const book = books.find(book => book.id == selectedBookId);
        if (selectedBookId && book) {
            formik.setValues({
                bookNumber: book.number.toString(),
                bookTypeId: book.type.id.toString(),
                bookCondition: book.bookCondition,
                comment: book.comment
            });
        } else {
            formik.setValues(defaultValues);
        }
    }, [selectedBookId]);

    const defaultValues: FormBookDto = {
        bookNumber: '',
        bookTypeId: '',
        bookCondition: '',
        comment: ''
    };

    const formik = useFormik<FormBookDto>({
        initialValues: defaultValues,
        async onSubmit(values: FormBookDto) {
            try {
                setLoading(true);
                const payload: BookDto = {
                    bookNumber: parseInt(values.bookNumber),
                    bookTypeId: parseInt(values.bookTypeId),
                    bookCondition: values.bookCondition,
                    comment: values.comment
                };
                if (selectedBookId) {
                    await updateBook(selectedBookId, payload);
                } else {
                    await saveBook(payload);
                    await formik.resetForm();
                    await formik.setFieldValue('bookTypeId', values.bookTypeId);
                }
            } finally {
                await reloadBooks();
                setLoading(false);
            }
        }
    });

    useEffect(() => {
        setLoading(booksLoading || bookTypesLoading);
    }, [booksLoading, bookTypesLoading]);

    const bookTypeOptions = bookTypes.length ?
        (bookTypes.map(type => (
            <MenuItem key={type.id} value={type.id}>
                {type.subject} {type.grade}
            </MenuItem>
        ))) : <MenuItem value=''>Aucun type de livre trouvé</MenuItem>;
    const bookConditionOptions = bookConditions.map(condition => <MenuItem key={condition}
                                                                           value={condition}>{condition}</MenuItem>);

    type BookRow = {
        id: string,
        number: string,
        isbn: string,
        section: string,
        condition: string
    }

    const bookRows: BookRow[] = books.map(book => ({
        id: book.id.toString(),
        number: book.number.toString().padStart(6, '0'),
        isbn: book.type.isbn.toString(),
        section: `${book.type.subject} ${book.type.grade}`,
        condition: book.bookCondition
    }));

    const columns: GridColDef[] = [
        {field: 'number', headerName: 'Numéro', flex: 1, cellClassName: 'pointer'},
        {field: 'isbn', headerName: 'ISBN', flex: 1, cellClassName: 'pointer'},
        {field: 'section', headerName: 'Section', flex: 2, cellClassName: 'pointer'},
        {field: 'condition', headerName: 'État', flex: 2, cellClassName: 'pointer'}
    ];

    function handleDeleteSelectedBook() {
        if (selectedBookId) setDeletionConfirmModalOpen(true);
    }

    async function handleConfirmDeletion() {
        if (selectedBookId) {
            try {
                setLoading(true);
                await deleteBook(selectedBookId);
                setSelectedBookId(undefined);
                setDeletionConfirmModalOpen(false);
            } finally {
                await reloadBooks();
                setLoading(false);
            }
        }
    }

    return (
        <div className='flex flex-col gap-4 p-2'>
            <LoadingWrapper loading={loading}>
                <form onSubmit={formik.handleSubmit} className='w-full flex gap-5 items-center'>
                    <div className='gap-3 flex flex-col py-3 flex-grow'>
                        <div className='flex gap-3 justify-center flex-wrap'>
                            <TextField name='bookNumber'
                                       type='number'
                                       label='Book number'
                                       variant='outlined'
                                       disabled={loading}
                                       required
                                       fullWidth
                                       className='max-w-[300px]'
                                       value={formik.values.bookNumber}
                                       onChange={(e) => formik.setFieldValue('bookNumber', e.target.value)}/>
                            <FormControl fullWidth className='max-w-[300px]'>
                                <InputLabel id="bookTypeLabel">Type de livre</InputLabel>
                                <Select name="bookTypeId"
                                        labelId='bookTypeLabel'
                                        label="Type de livre"
                                        disabled={loading}
                                        required
                                        fullWidth
                                        value={formik.values.bookTypeId}
                                        onChange={(e) => formik.setFieldValue('bookTypeId', e.target.value)}>
                                    <MenuItem value=''>Sélectionnez un type de livre</MenuItem>
                                    {bookTypeOptions}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth className='max-w-[300px]'>
                                <InputLabel id="bookConditionLabel">État du livre</InputLabel>
                                <Select name="bookCondition"
                                        labelId='bookConditionLabel'
                                        label="État du livre"
                                        disabled={loading}
                                        required
                                        fullWidth
                                        value={formik.values.bookCondition}
                                        onChange={(e) => formik.setFieldValue('bookCondition', e.target.value)}>
                                    <MenuItem value=''>Sélectionnez un état de livre</MenuItem>
                                    {bookConditionOptions}
                                </Select>
                            </FormControl>
                        </div>
                        <div className='flex justify-center'>
                            <TextField name='comment'
                                       label='Commentaire'
                                       disabled={loading}
                                       variant='outlined'
                                       fullWidth
                                       value={formik.values.comment}
                                       onChange={(e) => formik.setFieldValue('comment', e.target.value)}/>
                        </div>
                        <div className='flex justify-center gap-4 flex-wrap'>
                            {!!selectedBookId && <Button variant='text'
                                                         color='secondary'
                                                         disabled={loading}
                                                         fullWidth
                                                         className='max-w-[200px] !shadow-none !opacity-85 !text-black'
                                                         sx={{color: 'white', fontWeight: 'bold'}}
                                                         onClick={() => setSelectedBookId(undefined)}>
                                Fermer
                            </Button>}
                            {!!selectedBookId && <Button variant='contained'
                                                         disabled={loading}
                                                         color='error'
                                                         fullWidth
                                                         className='max-w-[200px] !shadow-none !opacity-85'
                                                         sx={{color: 'white', fontWeight: 'bold'}}
                                                         onClick={handleDeleteSelectedBook}>
                                Supprimer
                            </Button>}
                            <Button type='submit'
                                    color='success'
                                    variant='contained'
                                    disabled={loading}
                                    fullWidth
                                    className='max-w-[200px] !shadow-none !opacity-85'
                                    sx={{color: 'white', fontWeight: 'bold'}}>
                                {selectedBookId ? 'Modifer' : 'Ajouter'}
                            </Button>
                        </div>
                    </div>
                    <div className='w-[210px] h-[297px] rounded border overflow-hidden'>
                        {formik.values.bookTypeId ? (
                            <img src={bookTypes.find(b => b.id.toString() === formik.values.bookTypeId.toString())?.coverUrl ?? ''} alt='Book image' className='w-full h-full object-contain object-center'/>
                        ) : (
                            <div className='w-full h-full bg-black/20'/>
                        )}
                    </div>
                </form>
            </LoadingWrapper>
            <Divider/>
            <div className='w-full h-[800px]'>
                <DataGrid rows={bookRows}
                          loading={loading}
                          columns={columns}
                          initialState={{
                              pagination: {
                                  paginationModel: {page: 0, pageSize: 25},
                              },
                          }}
                          pageSizeOptions={[10, 25, 50, 100]} onRowClick={(a) => setSelectedBookId(a.row.id)}/>
            </div>
            {!!selectedBookId && <ConfirmModal open={deletionConfirmModalOpen}
                          title='Confirmation'
                          message='Êtes vous sûr de vouloir supprimer ce manuel ?'
                          onClose={() => setDeletionConfirmModalOpen(false)}
                          onCancel={() => setDeletionConfirmModalOpen(false)}
                          onConfirm={handleConfirmDeletion} />}
        </div>
    );
}