import './App.css'
import {Divider, ListItemIcon, ToggleButton, ToggleButtonGroup} from "@mui/material";
import {useState} from "react";
import BooksList from "../BooksList/BooksList.tsx";
import BookTypesList from "../BookTypesList/BookTypesList.tsx";
import ListIcon from '@mui/icons-material/List';

const views = ['bookList', 'bookTypesList'] as const;
const viewLabels = ['Livres', 'Types de livres'] as const;
type View = typeof views[number];

function App() {
    const [view, setView] = useState<View>(views[0]);

    const toggleViewOptions = views.map((view, i) => (
        <ToggleButton value={view} key={view}>
            <ListIcon />&nbsp;{viewLabels[i]}
        </ToggleButton>
    ));

    const viewContent = view === 'bookList' ? <BooksList /> : <BookTypesList />

    return (
        <div className='w-full h-full p-16 flex flex-col gap-4'>
            <p><span className='text-lg font-bold'>Bienvenue !</span> sur l'application d'inventaire de manuels de
                l'ASSO FL'</p>
            <Divider className='max-w-[300px]'/>
            <ToggleButtonGroup color='primary'
                               value={view}
                               exclusive
                               onChange={(_, value) => setView(value)}
                               aria-label='View'>
                {toggleViewOptions}
            </ToggleButtonGroup>
            {viewContent}
        </div>
    );
}

export default App
