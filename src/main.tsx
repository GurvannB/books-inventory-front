import React from 'react';
import ReactDOM from 'react-dom/client';
import AppPage from './pages/app/app.page.tsx'
import './index.css'
import WithAxios from "./withAxios.tsx";
import {createTheme, ThemeProvider} from "@mui/material";
import {AppContextProvider} from "./contexts/app.context.tsx";

const theme = createTheme({
    palette: {
        primary: {
            main: '#D8816F'
        },
        secondary: {
            main: '#242424'
        }
    }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AppContextProvider>
            <ThemeProvider theme={theme}>
                <WithAxios username='user' password='password'>
                    <div className='w-screen h-screen'>
                        <AppPage/>
                    </div>
                </WithAxios>
            </ThemeProvider>
        </AppContextProvider>
    </React.StrictMode>
);
