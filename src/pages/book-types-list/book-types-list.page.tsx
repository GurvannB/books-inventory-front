import {Button, Divider, MenuItem, TextField} from "@mui/material";
import {useApp} from "../../contexts/app.context.tsx";
import LoadingWrapper from "../../components/loading-wrapper.component.tsx";
import {bookConditions} from "../../core/constants.tsx";
import {useEffect, useState} from "react";
import {useFormik} from "formik";
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import ConfirmModal from "../../components/confirm-modal.component.tsx";
import {BookTypeDto} from "../../models/book-type.model.ts";
import {deleteBookType, saveBookType, updateBookType} from "../../services/book-types.service.ts";

type FormBookTypeDto = {
    isbn: string,
    editor: string,
    grade: string,
    subject: string,
    coverUrl: string
}

export default function BooksTypesListPage() {
    const [loading, setLoading] = useState(false);
    const [selectedBookTypeId, setSelectedBookTypeId] = useState<number | undefined>();
    const [deletionConfirmModalOpen, setDeletionConfirmModalOpen] = useState<boolean>(false);
    const {bookTypes, reloadBookTypes, bookTypesLoading} = useApp();

    useEffect(() => {
        const bookType = bookTypes.find(book => book.id == selectedBookTypeId);
        if (selectedBookTypeId && bookType) {
            formik.setValues({
                isbn: bookType.isbn.toString(),
                editor: bookType.editor,
                grade: bookType.grade,
                subject: bookType.subject,
                coverUrl: bookType.coverUrl
            });
        } else {
            formik.setValues(defaultValues);
        }
    }, [selectedBookTypeId]);

    const defaultValues: FormBookTypeDto = {
        isbn: '',
        editor: '',
        grade: '',
        subject: '',
        coverUrl: ''
    };

    const formik = useFormik<FormBookTypeDto>({
        initialValues: defaultValues,
        async onSubmit(values: FormBookTypeDto) {
            try {
                setLoading(true);
                const payload: BookTypeDto = {
                    isbn: parseInt(values.isbn),
                    editor: values.editor,
                    grade: values.grade,
                    subject: values.subject,
                    coverUrl: values.coverUrl
                };
                if (selectedBookTypeId) {
                    await updateBookType(selectedBookTypeId, payload);
                } else {
                    await saveBookType(payload);
                    await formik.resetForm();
                }
            } finally {
                await reloadBookTypes();
                setLoading(false);
            }
        }
    });

    useEffect(() => {
        setLoading(bookTypesLoading);
    }, [bookTypesLoading]);

    const bookTypeOptions = bookTypes.length ?
        (bookTypes.map(type => (
            <MenuItem key={type.id} value={type.id}>
                {type.subject} {type.grade}
            </MenuItem>
        ))) : <MenuItem value=''>Aucun type de livre trouvé</MenuItem>;
    const bookConditionOptions = bookConditions.map(condition => <MenuItem key={condition}
                                                                           value={condition}>{condition}</MenuItem>);

    function handleDeleteSelectedBook() {
        if (selectedBookTypeId) setDeletionConfirmModalOpen(true);
    }

    async function handleConfirmDeletion() {
        if (selectedBookTypeId) {
            try {
                setLoading(true);
                await deleteBookType(selectedBookTypeId);
                await reloadBookTypes();
                setSelectedBookTypeId(undefined);
                setDeletionConfirmModalOpen(false);
            } finally {
                setLoading(false);
            }
        }
    }

    const columns: GridColDef[] = [
        {field: 'isbn', headerName: 'ISBN', flex: 1, cellClassName: 'pointer'},
        {field: 'editor', headerName: 'Éditeur', flex: 1, cellClassName: 'pointer'},
        {field: 'subject', headerName: 'Matière', flex: 1, cellClassName: 'pointer'},
        {field: 'grade', headerName: 'Classe', flex: 1, cellClassName: 'pointer'},
    ];

    return (
        <div className='flex flex-col gap-4 p-2'>
            <LoadingWrapper loading={loading}>
                <form onSubmit={formik.handleSubmit} className='w-full gap-3 flex flex-col py-3'>
                    <div className='flex gap-3 justify-center flex-wrap'>
                        <TextField name='isbn'
                                   type='number'
                                   label='ISBN'
                                   variant='outlined'
                                   disabled={loading}
                                   required
                                   fullWidth
                                   className='max-w-[500px]'
                                   value={formik.values.isbn}
                                   onChange={(e) => formik.setFieldValue('isbn', e.target.value)}/>
                        <TextField name='editor'
                                   label='Éditeur'
                                   variant='outlined'
                                   disabled={loading}
                                   required
                                   fullWidth
                                   className='max-w-[500px]'
                                   value={formik.values.editor}
                                   onChange={(e) => formik.setFieldValue('editor', e.target.value)}/>
                    </div>
                    <div className='flex gap-3 justify-center flex-wrap'>
                        <TextField name='subject'
                                   label='Matière'
                                   variant='outlined'
                                   disabled={loading}
                                   required
                                   fullWidth
                                   className='max-w-[500px]'
                                   value={formik.values.subject}
                                   onChange={(e) => formik.setFieldValue('subject', e.target.value)}/>
                        <TextField name='grade'
                                   label='Classe'
                                   variant='outlined'
                                   disabled={loading}
                                   required
                                   fullWidth
                                   className='max-w-[500px]'
                                   value={formik.values.grade}
                                   onChange={(e) => formik.setFieldValue('grade', e.target.value)}/>
                    </div>
                    <div className='flex justify-center'>
                        <TextField name='coverUrl'
                                   label='Lien image de couverture'
                                   variant='outlined'
                                   disabled={loading}
                                   required
                                   fullWidth
                                   className='max-w-[1012px]'
                                   value={formik.values.coverUrl}
                                   onChange={(e) => formik.setFieldValue('coverUrl', e.target.value)}/>
                    </div>
                    <div className='flex justify-center gap-4 flex-wrap'>
                        {!!selectedBookTypeId && <Button variant='text'
                                                         color='secondary'
                                                         disabled={loading}
                                                         fullWidth
                                                         className='max-w-[200px] !shadow-none !opacity-85 !text-black'
                                                         sx={{color: 'white', fontWeight: 'bold'}}
                                                         onClick={() => setSelectedBookTypeId(undefined)}>
                            Fermer
                        </Button>}
                        {!!selectedBookTypeId && <Button variant='contained'
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
                            {selectedBookTypeId ? 'Modifer' : 'Ajouter'}
                        </Button>
                    </div>
                </form>
            </LoadingWrapper>
            <Divider/>
            <div className='w-full h-[800px]'>
                <DataGrid rows={bookTypes}
                          loading={loading}
                          columns={columns}
                          initialState={{
                              pagination: {
                                  paginationModel: {page: 0, pageSize: 25},
                              },
                          }}
                          pageSizeOptions={[10, 25, 50, 100]} onRowClick={(a) => setSelectedBookTypeId(a.row.id)}/>
            </div>
            {!!selectedBookTypeId && <ConfirmModal open={deletionConfirmModalOpen}
                                                   title='Confirmation'
                                                   message='Êtes vous sûr de vouloir supprimer ce manuel ?'
                                                   onClose={() => setDeletionConfirmModalOpen(false)}
                                                   onCancel={() => setDeletionConfirmModalOpen(false)}
                                                   onConfirm={handleConfirmDeletion}/>}
        </div>
    );
}