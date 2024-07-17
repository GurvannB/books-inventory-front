import './app.style.css'
import {Divider, ToggleButton, ToggleButtonGroup} from "@mui/material";
import {useEffect, useState} from "react";
import BooksListPage from "../books-list/books-list.page.tsx";
import BookTypesList from "../book-types-list/book-types-list.page.tsx";
import ListIcon from '@mui/icons-material/List';
import {useApp} from "../../contexts/app.context.tsx";

const views = ['bookList', 'bookTypesList'] as const;
const viewLabels = ['Livres', 'Types de livres'] as const;
type View = typeof views[number];

function AppPage() {
    const [view, setView] = useState<View>(views[0]);
    const {reloadBooks, reloadBookTypes} = useApp();

    const toggleViewOptions = views.map((view, i) => (
        <ToggleButton value={view} key={view}>
            <ListIcon />&nbsp;{viewLabels[i]}
        </ToggleButton>
    ));

    const viewContent = view === 'bookList' ? <BooksListPage /> : <BookTypesList />

    useEffect(() => {
        void reloadBooks();
        void reloadBookTypes();
    }, [view]);

    return (
        <div className='w-full h-full p-16 flex flex-col gap-4'>
            <p>
                <span className='text-lg font-bold'>Bienvenue !</span>
                &nbsp;sur l'application d'inventaire de manuels de&nbsp;
                <span className='font-bold'>l'ASSO FL'</span>
            </p>
            <Divider className='max-w-[300px]'/>
            <ToggleButtonGroup color='primary'
                               value={view}
                               exclusive
                               onChange={(_, value) => setView(value)}
                               aria-label='View'>
                {toggleViewOptions}
            </ToggleButtonGroup>
            <Divider className='max-w-[300px]'/>
            {viewContent}
        </div>
    );
}

export default AppPage
