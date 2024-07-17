import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/App/App.tsx'
import './index.css'
import WithAxios from "./withAxios.tsx";
import {createTheme, ThemeProvider} from "@mui/material";

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
        <ThemeProvider theme={theme}>
            <WithAxios username='user' password='password'>
                <div className='w-screen h-screen'>
                    <App/>
                </div>
            </WithAxios>
        </ThemeProvider>
    </React.StrictMode>,
)
