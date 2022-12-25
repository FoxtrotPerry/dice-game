import { Theme, useMediaQuery } from '@mui/material';
import { createContext, ReactNode, useContext, useState } from 'react';
import { darkTheme, lightTheme } from 'src/theme';

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
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [theme, setTheme] = useState(prefersDarkMode ? darkTheme : lightTheme);

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
