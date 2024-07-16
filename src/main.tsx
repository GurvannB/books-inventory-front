import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx'
import './index.css'
import WithAxios from "./withAxios.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <WithAxios username='user' password='password'>
        <App />
      </WithAxios>
  </React.StrictMode>,
)
