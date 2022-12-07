import { alpha, createTheme, Theme } from '@mui/material';
import { createContext, ReactNode, useContext, useState } from 'react';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        secondary: {
            main: alpha('#fff', 0.05),
            light: '#fff',
            dark: alpha('#fff', 0.15),
        },
    },
});

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        secondary: {
            main: alpha('#000', 0.05),
            light: '#fff',
            dark: alpha('#000', 0.15),
        },
        background: {
            default: alpha('#000', 0.2),
        },
    },
});

type PreferenceContext = {
    theme: Theme;
    toggleTheme: () => void;
};

type PreferenceContextProps = {
    children: ReactNode;
};

const PreferenceContextInstance = createContext<PreferenceContext>({
    theme: darkTheme,
    toggleTheme: () => {
        throw Error('Somehow you managed to use the toggleTheme() placeholder function');
    },
});

export const usePreferenceContext = () => {
    const c = useContext(PreferenceContextInstance);
    if (c) return c;
    throw new Error(
        'usePreferenceContext() must be called within the scope of a PreferenceContext provider component.'
    );
};

export const PreferenceContextProvider = ({ children }: PreferenceContextProps) => {
    const c = useContext(PreferenceContextInstance);
    const [theme, setTheme] = useState(c.theme);

    return (
        <PreferenceContextInstance.Provider
            value={{
                theme,
                toggleTheme: () => {
                    if (theme.palette.mode === 'dark') {
                        return setTheme(lightTheme);
                    } else setTheme(darkTheme);
                },
            }}
        >
            {children}
        </PreferenceContextInstance.Provider>
    );
};
