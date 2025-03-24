import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import setupLocatorUI from '@locator/runtime';
import { StrictMode } from 'react';

if (import.meta.env.DEV) {
    setupLocatorUI();
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
