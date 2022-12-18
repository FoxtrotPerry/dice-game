import { alpha, createTheme, ThemeOptions } from '@mui/material';

const baseTheme: ThemeOptions = {
    typography: {
        fontFamily: [
            'proxima',
            'Roboto',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
};

export const darkTheme = createTheme({
    ...baseTheme,
    palette: {
        mode: 'dark',
        secondary: {
            main: alpha('#fff', 0.05),
            light: '#fff',
            dark: alpha('#fff', 0.15),
        },
    },
});

export const lightTheme = createTheme({
    ...baseTheme,
    palette: {
        mode: 'light',
        secondary: {
            main: '#eee',
            light: '#fff',
            dark: '#ddd',
        },
        background: {
            default: '#ddd',
        },
    },
});
