import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import { GameSessionContextProvider, PreferenceContextProvider } from '@context';
import App from './App';
import './index.css';

if (!import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY) {
    throw new Error('Missing Publishable Clerk Key');
}
const clerkPubKey = import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        {/* <ClerkProvider publishableKey={clerkPubKey}> */}
        <BrowserRouter>
            <PreferenceContextProvider>
                <GameSessionContextProvider>
                    <App />
                </GameSessionContextProvider>
            </PreferenceContextProvider>
        </BrowserRouter>
        {/* </ClerkProvider> */}
    </React.StrictMode>
);
