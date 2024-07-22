import React from 'react';
import ReactDOM from 'react-dom/client';
import AppPage from './pages/app/app.page.tsx'
import './index.css'
import WithAxios from "./withAxios.tsx";
import {createTheme, ThemeProvider} from "@mui/material";
import {AppContextProvider} from "./contexts/app.context.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";

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
    <BrowserRouter>
        <ThemeProvider theme={theme}>
            <AppContextProvider>
                <WithAxios>
                    <div className='w-screen h-screen'>
                        <Routes>
                            <Route index element={<AppPage/>}/>
                        </Routes>
                    </div>
                </WithAxios>
            </AppContextProvider>
        </ThemeProvider>
    </BrowserRouter>
);
